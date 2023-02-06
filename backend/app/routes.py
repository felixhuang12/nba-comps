from flask import Blueprint, request, json, current_app, g, Response
from flask_pymongo import PyMongo
from werkzeug.local import LocalProxy
from .models import User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager

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

@login_routes.route('/test', methods=['GET'])
def test():
    return('hey')

@login_routes.route(f'{baseLoginUrl}/create', methods=['POST'])
def createUser():
    print('hit')
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
    return Response(response=json.dumps({"username": user['username'], "players": user['players']}))
