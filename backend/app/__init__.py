from flask import Flask
# from flask_cors import CORS
from app.views import player_routes, login_routes
from config import Config

app = Flask(__name__)

def create_app():
    # CORS(app, resources={r"/*": {"origins": "*"}})
    # app.config['CORS_HEADERS'] = 'Content-Type'
    app.config.from_object(Config)
    app.register_blueprint(player_routes)
    app.register_blueprint(login_routes)
    return app