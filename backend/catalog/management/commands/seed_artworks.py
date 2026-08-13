from django.core.management.base import BaseCommand
from catalog.models import Artist, Artwork
from social.models import Comment

SEED_DATA = [
  {
    "artist": {
      "name": "Gustav Klimt",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Klimt.jpg/800px-Klimt.jpg",
      "short_bio": "Gustav Klimt (1862–1918) was an Austrian symbolist painter and one of the most prominent members of the Vienna Secession movement.",
      "birth_year": "1862",
      "death_year": "1918",
      "nationality": "Austrian",
      "source_url": "https://en.wikipedia.org/wiki/Gustav_Klimt"
    },
    "artwork": {
      "title": "The Kiss",
      "year": "1907–1908",
      "medium": "Oil and gold leaf on canvas",
      "dimensions": "180 cm × 180 cm",
      "museum": "Österreichische Galerie Belvedere",
      "location": "Vienna, Austria",
      "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
      "short_description": "A shimmering masterpiece from Klimt's Golden Phase depicting two lovers entwined in a golden cape.",
      "full_description": "The Kiss (Der Kuss) was painted by Gustav Klimt between 1907 and 1908, the highpoint of his 'Golden Period', when he painted a number of works in a similar gilded style.",
      "source_museum": "Belvedere Museum",
      "full_description_url": "https://en.wikipedia.org/wiki/The_Kiss_(Klimt)",
      "license": "Public Domain / CC0",
      "category": "Symbolism",
      "tags": ["GoldLeaf", "ViennaSecession", "Symbolism", "Romantic"],
      "audio_title": "Chopin — Nocturne Op. 9 No. 2",
      "audio_composer": "Frédéric Chopin",
      "audio_url": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Chopin_-_Nocturne_Op._9_No._2_%28orchestral%29.ogg"
    },
    "comments": [
      {"author_name": "ArtLover_99", "avatar": "🎨", "text": "The detail on the gold leaf ornamentation is out of this world!"},
      {"author_name": "ViennaTraveler", "avatar": "🏛️", "text": "Saw this in person at Belvedere Museum last summer. Standing in front of it is a religious experience."}
    ]
  },
  {
    "artist": {
      "name": "Edvard Munch",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch_1921.jpg/800px-Edvard_Munch_1921.jpg",
      "short_bio": "Edvard Munch (1863–1944) was a Norwegian painter whose best known work, The Scream, has become one of the most iconic images of world art.",
      "birth_year": "1863",
      "death_year": "1944",
      "nationality": "Norwegian",
      "source_url": "https://en.wikipedia.org/wiki/Edvard_Munch"
    },
    "artwork": {
      "title": "The Scream",
      "year": "1893",
      "medium": "Oil, tempera, and pastel on cardboard",
      "dimensions": "91 cm × 73.5 cm",
      "museum": "National Museum of Art",
      "location": "Oslo, Norway",
      "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73.5_cm%2C_National_Gallery_of_Norway.jpg",
      "short_description": "An agonized figure set against a blood-red sky, capturing existential angst and modern anxiety.",
      "full_description": "The Scream is the popular name given to a composition created by Norwegian Expressionist artist Edvard Munch in 1893.",
      "source_museum": "National Museum Oslo",
      "full_description_url": "https://en.wikipedia.org/wiki/The_Scream",
      "license": "Public Domain / CC0",
      "category": "Expressionism",
      "tags": ["Expressionism", "Existential", "ModernArt", "Masterpiece"],
      "audio_title": "Beethoven — Symphony No. 5",
      "audio_composer": "Ludwig van Beethoven",
      "audio_url": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Ride_of_the_Valkyries.ogg"
    },
    "comments": [
      {"author_name": "ModernExistential", "avatar": "😱", "text": "Me every Monday morning looking at my inbox."},
      {"author_name": "CuratorMind", "avatar": "🖼️", "text": "Fun fact: Munch created four versions of this composition!"}
    ]
  },
  {
    "artist": {
      "name": "Vincent van Gogh",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
      "short_bio": "Vincent van Gogh (1853–1890) was a Dutch Post-Impressionist painter who posthumously became one of the most famous figures in Western art history.",
      "birth_year": "1853",
      "death_year": "1890",
      "nationality": "Dutch",
      "source_url": "https://en.wikipedia.org/wiki/Vincent_van_Gogh"
    },
    "artwork": {
      "title": "The Starry Night",
      "year": "1889",
      "medium": "Oil on canvas",
      "dimensions": "73.7 cm × 92.1 cm",
      "museum": "Museum of Modern Art (MoMA)",
      "location": "New York City, USA",
      "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      "short_description": "A swirling night sky over a quiet village, painted from the asylum window in Saint-Rémy-de-Provence.",
      "full_description": "The Starry Night is an oil-on-canvas painting by Dutch Post-Impressionist painter Vincent van Gogh, painted in June 1889.",
      "source_museum": "MoMA NYC",
      "full_description_url": "https://en.wikipedia.org/wiki/The_Starry_Night",
      "license": "Public Domain / CC0",
      "category": "Post-Impressionism",
      "tags": ["PostImpressionism", "VanGogh", "MoMA", "NightSky"],
      "audio_title": "Debussy — Clair de Lune",
      "audio_composer": "Claude Debussy",
      "audio_url": "https://upload.wikimedia.org/wikipedia/commons/b/be/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg"
    },
    "comments": [
      {"author_name": "CosmicDreamer", "avatar": "🌌", "text": "The fluid dynamics of the swirling clouds actually mirror turbulent fluid turbulence in physics!"}
    ]
  }
]

class Command(BaseCommand):
    help = 'Seeds initial public domain masterpieces and artists into the database'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with masterpieces...')
        
        for item in SEED_DATA:
            artist_data = item['artist']
            artist, _ = Artist.objects.get_or_create(
                name=artist_data['name'],
                defaults=artist_data
            )
            
            artwork_data = item['artwork']
            artwork, art_created = Artwork.objects.get_or_create(
                title=artwork_data['title'],
                artist=artist,
                defaults=artwork_data
            )
            
            if art_created:
                for c in item.get('comments', []):
                    Comment.objects.create(
                        artwork=artwork,
                        author_name=c['author_name'],
                        avatar=c['avatar'],
                        text=c['text']
                    )
                self.stdout.write(self.style.SUCCESS(f"Created artwork: {artwork.title} by {artist.name}"))
            else:
                self.stdout.write(f"Artwork already exists: {artwork.title}")
                
        self.stdout.write(self.style.SUCCESS('Successfully completed seeding!'))
