from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from data import foodbanks, inventories, food

app = Flask(__name__)
CORS(app)

@app.route('/api/banks/')
def banksRoute():  
    return jsonify(foodbanks)

@app.route('/api/banks/<bankid>/')
def bankById(bankid):
  valid = any([x['id'] == bankid for x in foodbanks])
  if valid:
    return jsonify([x for x in foodbanks if x['id'] == bankid][0])
  else:
    return Response('invalid bank id', 404)

@app.route('/api/inventory/')
def inventoryRoute():
  return jsonify(inventories)

@app.route('/api/inventory/<bankid>/')
def inventoryById(bankid):
  valid = any([x['bankid'] == bankid for x in inventories])
  if valid:
    return jsonify([x['food'] for x in inventories if x['bankid'] == bankid][0])
  else:
    return Response('invalid bank id', 404)

@app.route('/api/food/')
def foodRoute(): 
  return jsonify(food)
      
@app.route('/api/food/<foodid>/')
def foodById(foodid):
  valid = any([x['id'] == foodid for x in food])
  if valid:
    return jsonify([x for x in food if x['id'] == foodid][0])
  else:
    return Response('invalid food id', 404)

if __name__ == '__main__':
  app.run()