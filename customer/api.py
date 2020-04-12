from flask import Flask, jsonify, request, Response
from data import foodbanks, inventories, food

app = Flask(__name__)

def cors(res):
  res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  return res

@app.route('/api/banks/')
def banksRoute():  
    res = jsonify(foodbanks)
    return cors(res)

@app.route('/api/banks/<bankid>/')
def bankById(bankid):
  valid = any([x['id'] == bankid for x in foodbanks])
  if valid:
    res = jsonify([x for x in foodbanks if x['id'] == bankid][0])
    return cors(res)
  else:
    return cors(Response('invalid bank id', 404))

@app.route('/api/inventory/')
def inventoryRoute():
  res = jsonify(inventories)
  return cors(res)

@app.route('/api/inventory/<bankid>/')
def inventoryById(bankid):
  valid = any([x['bankid'] == bankid for x in inventories])
  if valid:
    res = jsonify([x['food'] for x in inventories if x['bankid'] == bankid][0])
    return cors(res)
  else:
    return cors(Response('invalid bank id', 404))

@app.route('/api/food/')
def foodRoute(): 
  res = jsonify(food)
  return cors(res)
      
@app.route('/api/food/<foodid>/')
def foodById(foodid):
  valid = any([x['id'] == foodid for x in food])
  if valid:
    res = jsonify([x for x in food if x['id'] == foodid][0])
    return cors(res)
  else:
    return cors(Response('invalid food id', 404))

if __name__ == '__main__':
  app.run()