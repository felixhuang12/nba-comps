from flask import Flask, Blueprint, request, json, current_app, g, Response, jsonify
from flask_pymongo import PyMongo
from pymongo import ReturnDocument
from werkzeug.local import LocalProxy
from .models import User, Player
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import decode_token
from flask_jwt_extended import JWTManager
from .nba_api_client import DataRetriever as NBA
from datetime import timedelta
from string import capwords

app = Flask(__name__)

player_routes = Blueprint('player', __name__)
login_routes = Blueprint('login', __name__)
user_routes = Blueprint('user', __name__)

baseLoginUrl = '/api/login'
baseUserUrl = '/api/users'

def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)

    if db is None:
        db = g._database = PyMongo(app).db
       
    return db

db = LocalProxy(get_db)

def init_bcrypt():
    return Bcrypt(app)

bcrypt = LocalProxy(init_bcrypt)

def init_jwt():
    return JWTManager(app)

jwt = LocalProxy(init_jwt)

@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"error": "Your access token has expired. Please log in again."}), 401

@login_routes.route(f'{baseLoginUrl}/create', methods=['POST'])
def createUser():
    data = json.loads(request.data.decode('UTF-8'))
    existingUser = db.users.find_one({'username': data['username']})
    if existingUser:
        error = json.dumps({'error': f"A user with username {data['username']} already exists."})
        return Response(response=error, status=400, content_type='application/json')
    passwordHash = bcrypt.generate_password_hash(password=data['password'])
    newUser = User(name=data['name'], username=data['username'], passwordHash=passwordHash)
    db.users.insert_one(dict(newUser))
    return Response(response=request.data, status=200, content_type='application/json')

@login_routes.route(f'{baseLoginUrl}/auth', methods=['POST'])
def login():
    credentials = json.loads(request.data.decode('UTF-8'))
    existingUser = db.users.find_one({'username': credentials['username']})
    print("USER LOG IN -----------------------")
    print(existingUser)
    print("------------------------------")
    if not existingUser:
        error = json.dumps({'error': f"User {credentials['username']} does not exist."})
        return Response(response=error, status=401, content_type='application/json')
    validated = bcrypt.check_password_hash(existingUser['passwordHash'], credentials['password'])
    if not validated:
        error = json.dumps({'error': "Incorrect password."})
        return Response(response=error, status=401, content_type='application/json')
    dt = timedelta(minutes=60)
    access_token = create_access_token(identity=existingUser['username'], expires_delta=dt)
    return Response(response=json.dumps({ "token": access_token, "username": existingUser['username'], "name": existingUser['name']}), status=200, content_type='application/json')

@user_routes.route(f'{baseUserUrl}/deleteUser', methods=['DELETE'])
def deleteUser():
    token = request.headers.get('Authorization').split()[1]
    decoded_token = decode_token(token)
    username = decoded_token["sub"]
    user = db.users.delete_one({'username': username})
    return Response(response=json.dumps({"message": "success: deleted account"}))

@user_routes.route(f'{baseUserUrl}/<username>/getPlayers')
def getPlayers(username: str):
    user = db.users.find_one({'username': username})
    players = user["players"]
    playersInfo = []
    for player_id in players:
        player_data = db.players.find_one({'id': player_id}, {'_id': 0})
        print(player_data)
        playerObj = Player(id=player_data["id"], commonPlayerInfo=player_data["commonPlayerInfo"], seasonStatistics=player_data["seasonStatistics"], last10Statistics=player_data["last10Statistics"])
        playersInfo.append(playerObj.dict())
    print("USER PLAYERS -----------------")
    print(playersInfo)
    print("------------------------------")
    return Response(response=json.dumps({"username": user['username'], "players": playersInfo}))

@user_routes.route(f'{baseUserUrl}/addplayer', methods=['POST'])
def addPlayer():
    token = request.headers.get('Authorization').split()[1]
    decoded_token = decode_token(token)
    username = decoded_token["sub"]
    data = request.get_json()
    player_name = data["player_name"]
    full_name = capwords(player_name.lower())
    existing_player = db.players.find_one({"commonPlayerInfo.name": full_name})
    if existing_player is None:
        return Response(response=json.dumps({"error": "Player does not exist."}), status=404, content_type='application/json')
    existing_user = db.users.find_one({"username": username})
    for player_id in existing_user["players"]:
        if player_id == existing_player["id"]:
            return Response(response=json.dumps({"error": "Player has already been added."}), status=400, content_type='application/json')
    db.users.find_one_and_update({'username': username}, {"$push": {"players": existing_player["id"]}}, projection={'_id': False, 'passwordHash': False}, return_document=ReturnDocument.AFTER)
    res = getPlayers(username)
    if res:
        return res
    else:
        return Response(response=json.dumps({"error": "Player addition not successful."}), status=500, content_type='application/json')

@user_routes.route(f'{baseUserUrl}/deleteplayer/<id>', methods=['DELETE'])
def deletePlayer(id):
    token = request.headers.get('Authorization').split()[1]
    decoded_token = decode_token(token)
    username = decoded_token["sub"]
    existing_user = db.users.find_one({"username": username})
    players = existing_user["players"]
    updated_players = [player for player in players if player != int(id)]
    db.users.find_one_and_update({'username': username}, {"$set": {"players": updated_players}}, projection={'_id': False, 'passwordHash': False}, return_document=ReturnDocument.AFTER)
    res = getPlayers(username)
    if res:
        return res
    else:
        return Response(response=json.dumps({"error": "Update not successful."}), status=500, content_type='application/json')


@player_routes.route('/api/nba_api/active_players')
def getAllActivePlayers():
    active_players = []
    for player in db.players.find({}, {'_id': 0}):
        tmp = {'id': player['id'], 'full_name': player['commonPlayerInfo']['name']}
        active_players.append(tmp)
    # print(db.players.find({}, {'_id': 0}))
    # client = NBA()
    # active_players = client.getAllActivePlayers()
    # active_players = db.players.find({}, {'_id': 0})
    return Response(response=json.dumps({"active_players": active_players}), status=200, content_type='application/json')
