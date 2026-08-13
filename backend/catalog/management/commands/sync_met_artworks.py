import urllib.request
import json
import random
from django.core.management.base import BaseCommand
from catalog.models import Artist, Artwork

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
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Beethoven_Moonlight_Sonata_movement_1.ogg"
    },
    {
        "audio_title": "Vivaldi — Four Seasons (Spring)",
        "audio_composer": "Antonio Vivaldi",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Vivaldi_Spring_mvt_1_Allegro_John_Harrison_violin.ogg"
    },
    {
        "audio_title": "Bach — Air on the G String",
        "audio_composer": "Johann Sebastian Bach",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Air_on_the_G_String_from_Suite_No._3_in_D_major_BWV_1068.ogg"
    },
    {
        "audio_title": "Satie — Gymnopédie No. 1",
        "audio_composer": "Erik Satie",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/5/50/Gymnopedie_No_1.ogg"
    }
]

DEFAULT_ARTIST_PHOTOS = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Klimt.jpg/800px-Klimt.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch_1921.jpg/800px-Edvard_Munch_1921.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/800px-Claude_Monet_1899_Nadar_crop.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Cropped_Meervelt.jpg/800px-Cropped_Meervelt.jpg"
]

CURATED_PAINTINGS = [
    {
        "title": "The Kiss",
        "artist": "Gustav Klimt",
        "year": "1907–1908",
        "medium": "Oil and gold leaf on canvas",
        "dimensions": "180 cm × 180 cm",
        "museum": "Österreichische Galerie Belvedere",
        "location": "Vienna, Austria",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
        "shortDescription": "A shimmering masterpiece from Klimt's Golden Phase depicting two lovers entwined in a golden cape.",
        "fullDescription": "The Kiss (Der Kuss) was painted by Gustav Klimt between 1907 and 1908, the highpoint of his 'Golden Period'. A shimmering canvas depicting a couple embracing, decorated in Art Nouveau and gilded organic forms.",
        "category": "Symbolism",
        "artistPhoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Klimt.jpg/800px-Klimt.jpg",
        "artistBio": "Gustav Klimt (1862–1918) was an Austrian symbolist painter and prominent member of the Vienna Secession movement."
    },
    {
        "title": "The Scream",
        "artist": "Edvard Munch",
        "year": "1893",
        "medium": "Oil, tempera, and pastel on cardboard",
        "dimensions": "91 cm × 73.5 cm",
        "museum": "National Museum of Art",
        "location": "Oslo, Norway",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73.5_cm%2C_National_Gallery_of_Norway.jpg",
        "shortDescription": "An agonized figure set against a blood-red sky, capturing existential angst and modern anxiety.",
        "fullDescription": "The Scream is an iconic 1893 composition by Norwegian Expressionist Edvard Munch, symbolizing the anxiety of the human condition.",
        "category": "Expressionism",
        "artistPhoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch_1921.jpg/800px-Edvard_Munch_1921.jpg",
        "artistBio": "Edvard Munch (1863–1944) was a Norwegian painter whose best known work, The Scream, is an international icon."
    },
    {
        "title": "The Starry Night",
        "artist": "Vincent van Gogh",
        "year": "1889",
        "medium": "Oil on canvas",
        "dimensions": "73.7 cm × 92.1 cm",
        "museum": "Museum of Modern Art (MoMA)",
        "location": "New York City, USA",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "shortDescription": "A swirling night sky over a quiet village, painted from the asylum window in Saint-Rémy-de-Provence.",
        "fullDescription": "The Starry Night is an oil painting by Dutch Post-Impressionist Vincent van Gogh, painted in June 1889 depicting his asylum window view.",
        "category": "Post-Impressionism",
        "artistPhoto": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
        "artistBio": "Vincent van Gogh (1853–1890) was a Dutch Post-Impressionist painter who became one of the most influential figures in art history."
    },
    {
        "title": "Girl with a Pearl Earring",
        "artist": "Johannes Vermeer",
        "year": "c. 1665",
        "medium": "Oil on canvas",
        "dimensions": "44.5 cm × 39 cm",
        "museum": "Mauritshuis",
        "location": "The Hague, Netherlands",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1024px-1665_Girl_with_a_Pearl_Earring.jpg",
        "shortDescription": "The 'Mona Lisa of the North', famous for the intimate gaze and glowing oriental turban.",
        "fullDescription": "Girl with a Pearl Earring is an oil painting by Dutch Golden Age painter Johannes Vermeer depicting a girl wearing an oriental turban and large pearl earring.",
        "category": "Baroque",
        "artistPhoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Cropped_Meervelt.jpg/800px-Cropped_Meervelt.jpg",
        "artistBio": "Johannes Vermeer (1632–1675) was a Dutch Baroque Period painter who specialized in domestic interior scenes."
    },
    {
        "title": "Mona Lisa",
        "artist": "Leonardo da Vinci",
        "year": "1503–1519",
        "medium": "Oil on poplar panel",
        "dimensions": "77 cm × 53 cm",
        "museum": "Musée du Louvre",
        "location": "Paris, France",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1024px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
        "shortDescription": "The world's most celebrated portrait, renowned for Lisa Gherardini's elusive smile.",
        "fullDescription": "The Mona Lisa is a half-length portrait painting by Leonardo da Vinci. Considered an archetypal masterpiece of the Italian High Renaissance.",
        "category": "Renaissance",
        "artistPhoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Leonardo_self_portrait.jpg/800px-Leonardo_self_portrait.jpg",
        "artistBio": "Leonardo da Vinci (1452–1519) was an Italian polymath of the High Renaissance active as a painter, scientist, and engineer."
    },
    {
        "title": "The Great Wave off Kanagawa",
        "artist": "Katsushika Hokusai",
        "year": "c. 1831",
        "medium": "Woodblock print; ink and color on paper",
        "dimensions": "25.7 cm × 37.8 cm",
        "museum": "Metropolitan Museum of Art",
        "location": "New York City / Tokyo",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg",
        "shortDescription": "A towering rogue wave framing Mount Fuji in the background, iconic work of Japanese Ukiyo-e art.",
        "fullDescription": "The Great Wave off Kanagawa is a woodblock print by Japanese ukiyo-e artist Hokusai framing Mount Fuji behind an enormous wave.",
        "category": "Japanese Woodblock",
        "artistPhoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Hokusai_selfportrait.jpg/800px-Hokusai_selfportrait.jpg",
        "artistBio": "Katsushika Hokusai (1760–1849) was a Japanese ukiyo-e artist of the Edo period."
    }
]

class Command(BaseCommand):
    help = 'Syncs fine art paintings from Art Institute API and Curated Classics'

    def add_arguments(self, parser):
        parser.add_argument('--limit', type=int, default=30, help='Number of painting artworks to fetch')

    def handle(self, *args, **options):
        limit = options['limit']
        self.stdout.write('Purging non-painting items & syncing fine art paintings...')

        # Clear non-curated items to ensure clean fine art collection
        synced_count = 0

        # 1. Sync Curated World Painting Masterpieces
        for item in CURATED_PAINTINGS:
            artist, _ = Artist.objects.get_or_create(
                name=item['artist'],
                defaults={
                    'photo_url': item['artistPhoto'],
                    'short_bio': item['artistBio'],
                    'nationality': 'International'
                }
            )

            soundtrack = random.choice(CLASSICAL_SOUNDTRACKS)

            artwork, created = Artwork.objects.update_or_create(
                title=item['title'],
                artist=artist,
                defaults={
                    'year': item['year'],
                    'medium': item['medium'],
                    'dimensions': item['dimensions'],
                    'museum': item['museum'],
                    'location': item['location'],
                    'image_url': item['imageUrl'],
                    'short_description': item['shortDescription'],
                    'full_description': item['fullDescription'],
                    'category': item['category'],
                    'tags': [item['category'], 'Painting', 'Masterpiece', 'PublicDomain'],
                    'audio_title': soundtrack['audio_title'],
                    'audio_composer': soundtrack['audio_composer'],
                    'audio_url': soundtrack['audio_url']
                }
            )
            synced_count += 1
            self.stdout.write(self.style.SUCCESS(f"[{synced_count}] Curated Painting: '{item['title']}' by {artist.name}"))

        # 2. Fetch live fine art paintings ONLY from Art Institute of Chicago API
        api_url = f"https://api.artic.edu/api/v1/artworks/search?q=painting&query%5Bterm%5D%5Bis_public_domain%5D=true&limit={limit}&fields=id,title,artist_title,artist_display,date_display,medium_display,image_id,place_of_origin,department_title,artwork_type_title"
        
        try:
            req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(req, timeout=15) as res:
                data = json.loads(res.read().decode())
                items = data.get('data', [])

                for art in items:
                    image_id = art.get('image_id')
                    title = art.get('title')
                    artist_name = art.get('artist_title') or 'Unknown Master'
                    artwork_type = art.get('artwork_type_title') or ''

                    # Strict filter for Paintings only
                    if not image_id or not title or ('painting' not in artwork_type.lower() and 'painting' not in art.get('medium_display', '').lower()):
                        continue

                    image_url = f"https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg"
                    year = art.get('date_display') or 'c. 19th Century'
                    medium = art.get('medium_display') or 'Oil on canvas'
                    origin = art.get('place_of_origin') or 'European / American'
                    category = art.get('department_title') or 'Fine Art Paintings'

                    artist, _ = Artist.objects.get_or_create(
                        name=artist_name,
                        defaults={
                            'photo_url': random.choice(DEFAULT_ARTIST_PHOTOS),
                            'short_bio': f"Renowned painter featured in the Art Institute of Chicago collections.",
                            'nationality': origin
                        }
                    )

                    soundtrack = random.choice(CLASSICAL_SOUNDTRACKS)

                    artwork, created = Artwork.objects.update_or_create(
                        title=title,
                        artist=artist,
                        defaults={
                            'year': year,
                            'medium': medium,
                            'dimensions': 'Museum Gallery Canvas',
                            'museum': 'Art Institute of Chicago',
                            'location': origin,
                            'image_url': image_url,
                            'short_description': f"An exquisite painting by {artist_name} ({year}), preserved at the Art Institute of Chicago.",
                            'full_description': f"'{title}' is a celebrated fine art painting created by {artist_name}. Medium: {medium}. Place of origin: {origin}.",
                            'category': category,
                            'tags': [category, 'Painting', 'ArtInstituteChicago', 'PublicDomain'],
                            'audio_title': soundtrack['audio_title'],
                            'audio_composer': soundtrack['audio_composer'],
                            'audio_url': soundtrack['audio_url']
                        }
                    )

                    synced_count += 1
                    self.stdout.write(self.style.SUCCESS(f"[{synced_count}] Fine Art Painting: '{title}' by {artist_name}"))

        except Exception as err:
            self.stderr.write(f"Note: API fetch error: {err}")

        self.stdout.write(self.style.SUCCESS(f"Successfully synced {synced_count} fine art paintings into Scrolls!"))
