import boto3
from hashlib import sha256
from decimal import Decimal

SPINACH_URL = 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg'
FBB_URL = 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg'
TOM_URL = 'https://static.pexels.com/photos/8390/food-wood-tomatoes.jpg'
LETT_URL = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Lettuce_Mini_Heads_%287331119710%29.jpg'
CAUL_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Cauliflowers_-_20051021.jpg/1280px-Cauliflowers_-_20051021.jpg'
BAN_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/1024px-Bananas.jpg'
OR_URL = 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg'
APP_URL = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg'
GRA_URL = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg'
PEA_URL = 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Autumn_Red_peaches.jpg'
CINN_URL = 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cinnamon-other.jpg'
SAFF_URL = 'https://upload.wikimedia.org/wikipedia/commons/4/48/Saffron_Crop.JPG'
TURM_URL = 'http://maxpixel.freegreatpicture.com/static/photo/1x/Seasoning-Powder-Curry-Spice-Ingredient-Turmeric-2344157.jpg'
COR_URL = 'http://maxpixel.freegreatpicture.com/static/photo/1x/Ingredient-Herb-Seasoning-Seeds-Food-Coriander-390015.jpg'
LAV_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg/1280px-Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg'
BAG_URL = 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Bagel-Plain-Alt.jpg'
STR_URL = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Strawberries.jpg'
BBAG_URL = 'https://static.pexels.com/photos/416607/pexels-photo-416607.jpeg'

table = boto3.resource('dynamodb').Table('[INSERT DYNAMODB TABLE NAME]')


product_list = [
    {'name': 'Spinach', 'price': Decimal('4.0'), 'category': 'vegetables', 'url': SPINACH_URL},
    {'name': 'Freshly Baked Bread', 'price': Decimal('3.0'), 'category': 'bread', 'url': FBB_URL},
    {'name': 'Tomato', 'price': Decimal('2.5'), 'category': 'vegetables', 'url': TOM_URL},
    {'name': 'Lettuce', 'price': Decimal('1.0'), 'category': 'vegetables', 'url': LETT_URL},
    {'name': 'Cauliflower', 'price': Decimal('1.75'), 'category': 'vegetables', 'url': CAUL_URL},
    {'name': 'Banana', 'price': Decimal('1.25'), 'category': 'fruits', 'url': BAN_URL},
    {'name': 'Orange', 'price': Decimal('1.7'), 'category': 'fruits', 'url': OR_URL},
    {'name': 'Apple', 'price': Decimal('2.0'), 'category': 'fruits', 'url': APP_URL},
    {'name': 'Grape', 'price': Decimal('2.0'), 'category': 'fruits', 'url': GRA_URL},
    {'name': 'Peach', 'price': Decimal('2.0'), 'category': 'fruits', 'url': PEA_URL},
    {'name': 'Cinnamon Sticks', 'price': Decimal('0.5'), 'category': 'seasonings', 'url': CINN_URL},
    {'name': 'Saffron', 'price': Decimal('3'), 'category': 'seasonings', 'url': SAFF_URL},
    {'name': 'Ground Turmeric', 'price': Decimal('0.75'), 'category': 'seasonings', 'url': TURM_URL},
    {'name': 'Coriander Seeds', 'price': Decimal('0.5'), 'category': 'seasonings', 'url': COR_URL},
    {'name': 'Lavash Bread', 'price': Decimal('1.25'), 'category': 'bread', 'url': LAV_URL},
    {'name': 'Bagel', 'price': Decimal('3'), 'category': 'bread', 'url': BAG_URL},
    {'name': 'Strawberry', 'price': Decimal('1.95'), 'category': 'fruits', 'url': STR_URL},
    {'name': 'Baguette', 'price': Decimal('1.25'), 'category': 'bread', 'url': BBAG_URL}
]

with table.batch_writer() as batch:
    for product in product_list:
        composite = str.encode(product['name']+str(product['price'])+product['category']+product['url'])
        batch.put_item(
            Item={
                'PK': "PROD#" + str(sha256(composite).hexdigest()),
                'SK': product['category'],
                'price': product['price'],
                'product_name': product['name'],
                'img_url': product['url']
            }
        )

