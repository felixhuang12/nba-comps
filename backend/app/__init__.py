from flask import Flask
# from flask_cors import CORS
from app.views import player_routes

def create_app():
    app = Flask(__name__)
    # CORS(app, resources={r"/*": {"origins": "*"}})
    # app.config['CORS_HEADERS'] = 'Content-Type'
    app.register_blueprint(player_routes)
    return app