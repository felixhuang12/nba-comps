from flask import Blueprint

player_routes = Blueprint('player', __name__)

@player_routes.route('/')
def test():
    return ("test1")

@player_routes.route('/index')
def test2():
    return ("test2")