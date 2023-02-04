from flask import Blueprint, request, json

player_routes = Blueprint('player', __name__)
login_routes = Blueprint('login', __name__)

baseLoginUrl = '/api/login'
# baseUserUrl =

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
        print(data['name'])
        print(data['username'])
        return request.data