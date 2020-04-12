from flask_frozen import Freezer
from api import app
from data import foodbanks, inventories, food

freezer = Freezer(app)

@freezer.register_generator
def bankById():
  for bank in foodbanks:
    yield {'bankid': bank['id']}

@freezer.register_generator
def inventoryById():
  for bank in foodbanks:
    yield {'bankid': bank['id']}

@freezer.register_generator
def foodById():
  for item in food:
    yield {'foodid': item['id']}

freezer.freeze()