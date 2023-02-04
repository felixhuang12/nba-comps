from flask import Blueprint, request, json, current_app, g, Response
from flask_pymongo import PyMongo
from werkzeug.local import LocalProxy
from .models import User
from flask_bcrypt import Bcrypt

player_routes = Blueprint('player', __name__)
login_routes = Blueprint('login', __name__)

baseLoginUrl = '/api/login'
# baseUserUrl =

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

@player_routes.route('/api')
def test():
    return ("test1")

@player_routes.route('/api/index')
def test2():
    return ("test2")

@login_routes.route(f'{baseLoginUrl}/create', methods=['POST'])
def createUser():
    data = json.loads(request.data.decode('UTF-8'))
    print(data)
    existingUser = db.users.find_one({'username': data['username']})
    if existingUser:
        error = json.dumps({'error': f"A user with username {data['username']} already exists."})
        return Response(response=error, status=400, mimetype='application/json')
    passwordHash = bcrypt.generate_password_hash(password=data['password'])
    newUser = User(name=data['name'], username=data['username'], passwordHash=passwordHash)
    db.users.insert_one(dict(newUser))
    return Response(response=request.data, status=200, mimetype='application/json')