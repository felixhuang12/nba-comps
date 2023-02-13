from flask import Blueprint, request, json, current_app, g, Response
from flask_pymongo import PyMongo
from pymongo import ReturnDocument
from werkzeug.local import LocalProxy
from .models import User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import decode_token
from flask_jwt_extended import JWTManager
from .nba_api_client import DataRetriever as NBA

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
        db = g._database = PyMongo(current_app).db
       
    return db

db = LocalProxy(get_db)

def init_bcrypt():
    return Bcrypt(current_app)

bcrypt = LocalProxy(init_bcrypt)

# def init_jwt():
#     return JWTManager(current_app)

# jwt = LocalProxy(init_jwt)

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
    print("USER LOGGED IN -----------------------")
    print(existingUser)
    if not existingUser:
        error = json.dumps({'error': f"User {credentials['username']} does not exist."})
        return Response(response=error, status=401, content_type='application/json')
    validated = bcrypt.check_password_hash(existingUser['passwordHash'], credentials['password'])
    if not validated:
        error = json.dumps({'error': "Incorrect password."})
        return Response(response=error, status=401, content_type='application/json')
    access_token = create_access_token(identity=existingUser['username'])
    return Response(response=json.dumps({ "token": access_token, "username": existingUser['username'], "name": existingUser['name']}), status=200, content_type='application/json')

@user_routes.route(f'{baseUserUrl}/<username>')
def getPlayers(username: str):
    user = db.users.find_one({'username': username})
    print("USER PLAYERS -----------------")
    print(user["players"])
    print("------------------------------")
    return Response(response=json.dumps({"username": user['username'], "players": user['players']}))

@user_routes.route(f'{baseUserUrl}/addplayer', methods=['POST'])
def addPlayer():
    token = request.headers.get('Authorization').split()[1]
    print("Token: " + token)
    print("--------------------")
    decoded_token = decode_token(token)
    print("Decoded token: ")
    print(decoded_token)
    print("--------------------")
    if not decoded_token["sub"]:
        return Response(response=json.dumps({"error": "User is not authorized."}), status=401, content_type='application/json')
    username = decoded_token["sub"]
    data = request.get_json()
    player_name = data["player_name"]
    client = NBA()
    player_id = client.getPlayerIDFromName(player_name)
    if player_id is None:
        return Response(response=json.dumps({"error": "Player does not exist."}), status=404, content_type='application/json')
    player_data = client.getAggregatePlayerInfo(player_id)
    formatted = {"id": player_data[0]["id"], "commonPlayerInfo": player_data[0], "seasonStatistics": player_data[1], "last10Statistics": player_data[2]}
    existing_user = db.users.find_one({"username": username})
    for player in existing_user["players"]:
        if player["id"] == formatted["id"]:
            return Response(response=json.dumps({"error": "Player is already added."}), status=400, content_type='application/json')
    updated_data = db.users.find_one_and_update({'username': username}, {"$push": {"players": formatted}}, projection={'_id': False, 'passwordHash': False}, return_document=ReturnDocument.AFTER)
    return Response(response=json.dumps({"data": updated_data}), status=200, content_type='application/json')


@player_routes.route('/api/nba_api/active_players')
def getAllActivePlayers():
    client = NBA()
    active_players = client.getAllActivePlayers()
    return Response(response=json.dumps({"active_players": active_players}), status=200, content_type='application/json')
