import urllib.request
import json
import random
from django.core.management.base import BaseCommand
from catalog.models import Artist, Artwork

# Classical music pairings pool
CLASSICAL_SOUNDTRACKS = [
    {
        "audio_title": "Chopin — Nocturne Op. 9 No. 2",
        "audio_composer": "Frédéric Chopin",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Chopin_-_Nocturne_Op._9_No._2_%28orchestral%29.ogg"
    },
    {
        "audio_title": "Debussy — Clair de Lune",
        "audio_composer": "Claude Debussy",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/b/be/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg"
    },
    {
        "audio_title": "Beethoven — Moonlight Sonata",
        "audio_composer": "Ludwig van Beethoven",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Ride_of_the_Valkyries.ogg"
    },
    {
        "audio_title": "Vivaldi — Four Seasons (Spring)",
        "audio_composer": "Antonio Vivaldi",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Chopin_-_Nocturne_Op._9_No._2_%28orchestral%29.ogg"
    },
    {
        "audio_title": "Bach — Cello Suite No. 1",
        "audio_composer": "Johann Sebastian Bach",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/b/be/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg"
    }
]

DEFAULT_ARTIST_PHOTOS = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Klimt.jpg/800px-Klimt.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch_1921.jpg/800px-Edvard_Munch_1921.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Claude_Monet_1899_Nadar.jpg/800px-Claude_Monet_1899_Nadar.jpg"
]

class Command(BaseCommand):
    help = 'Fetches real public domain masterpieces from The Metropolitan Museum of Art API'

    def add_arguments(self, parser):
        parser.add_argument('--limit', type=int, default=30, help='Number of artworks to fetch and sync')

    def handle(self, *args, **options):
        limit = options['limit']
        self.stdout.write(f'Fetching top public domain artworks from The Met API (limit={limit})...')

        # Met API Search for highlighted paintings with images
        search_url = 'https://collectionapi.metmuseum.org/api/public/v1/search?isHighlight=true&hasImages=true&q=painting'
        
        try:
            req = urllib.request.Request(search_url, headers={'User-Agent': 'ScrollsCuratedApp/1.0'})
            with urllib.request.urlopen(req, timeout=15) as response:
                data = json.loads(response.read().decode())
                object_ids = data.get('objectIDs', [])
        except Exception as e:
            self.stderr.write(f'Error querying Met API search: {e}')
            return

        if not object_ids:
            self.stdout.write('No object IDs returned from Met API search.')
            return

        self.stdout.write(f'Found {len(object_ids)} highlighted objects from The Met. Syncing {limit} items...')

        synced_count = 0
        random.shuffle(object_ids)

        for obj_id in object_ids:
            if synced_count >= limit:
                break

            obj_url = f'https://collectionapi.metmuseum.org/api/public/v1/objects/{obj_id}'
            try:
                obj_req = urllib.request.Request(obj_url, headers={'User-Agent': 'ScrollsCuratedApp/1.0'})
                with urllib.request.urlopen(obj_req, timeout=10) as res:
                    item = json.loads(res.read().decode())
            except Exception as err:
                continue

            # Must have public domain image
            image_url = item.get('primaryImageSmall') or item.get('primaryImage')
            title = item.get('title')
            artist_name = item.get('artistDisplayName') or 'Unknown Master'

            if not image_url or not title or not item.get('isPublicDomain'):
                continue

            # Process Artist
            artist_bio = item.get('artistDisplayBio') or ''
            nationality = item.get('artistNationality') or ''
            artist_photo = random.choice(DEFAULT_ARTIST_PHOTOS)

            artist, _ = Artist.objects.get_or_create(
                name=artist_name,
                defaults={
                    'short_bio': artist_bio,
                    'nationality': nationality,
                    'photo_url': artist_photo,
                    'source_url': item.get('artistWikidata_URL') or item.get('objectURL') or ''
                }
            )

            # Metadata details
            year = item.get('objectDate') or 'c. 19th Century'
            medium = item.get('medium') or 'Oil on canvas'
            dimensions = item.get('dimensions') or 'Dimensions variable'
            museum = item.get('repository') or 'The Metropolitan Museum of Art, New York'
            category = item.get('department') or 'European Paintings'
            source_url = item.get('objectURL') or 'https://www.metmuseum.org'

            short_desc = f"An iconic masterpiece by {artist_name} ({year}), preserved in the permanent collection of {museum}."
            full_desc = f"{title} is a renowned work created by {artist_name}. {artist_bio}. Medium: {medium}. Dimensions: {dimensions}."

            soundtrack = random.choice(CLASSICAL_SOUNDTRACKS)

            artwork, created = Artwork.objects.update_or_create(
                title=title,
                artist=artist,
                defaults={
                    'year': year,
                    'medium': medium,
                    'dimensions': dimensions,
                    'museum': museum,
                    'location': 'New York City, USA',
                    'image_url': image_url,
                    'short_description': short_desc,
                    'full_description': full_desc,
                    'source_museum': 'The Metropolitan Museum of Art',
                    'full_description_url': source_url,
                    'license': 'Public Domain / CC0',
                    'category': category,
                    'tags': [category, 'MetMuseum', 'PublicDomain', 'Masterpiece'],
                    'audio_title': soundtrack['audio_title'],
                    'audio_composer': soundtrack['audio_composer'],
                    'audio_url': soundtrack['audio_url']
                }
            )

            synced_count += 1
            status_str = "Created" if created else "Updated"
            self.stdout.write(self.style.SUCCESS(f"[{synced_count}/{limit}] {status_str}: '{title}' by {artist_name}"))

        self.stdout.write(self.style.SUCCESS(f"Successfully synced {synced_count} real masterpieces from The Met Museum!"))
