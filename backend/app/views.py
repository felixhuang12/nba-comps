from flask import Blueprint, request, json, current_app, g
from flask_pymongo import PyMongo
from werkzeug.local import LocalProxy

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

@player_routes.route('/api')
def test():
    return ("test1")

@player_routes.route('/api/index')
def test2():
    return ("test2")

@login_routes.route(f'{baseLoginUrl}/create', methods=['POST', 'GET'])
def createUser():
    if request.method == 'POST':
        data = json.loads(request.data.decode('UTF-8'))
        print(data)
        db.users.insert_one(data)
        return request.data