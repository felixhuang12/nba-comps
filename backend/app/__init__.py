from flask import Flask
# from flask_cors import CORS
from .routes import player_routes, login_routes, user_routes, init_bcrypt
from config import Config
from flask_jwt_extended import JWTManager

app = Flask(__name__)

def create_app():
    # CORS(app, resources={r"/*": {"origins": "*"}})
    # app.config['CORS_HEADERS'] = 'Content-Type'
    app.config.from_object(Config)
    app.register_blueprint(player_routes)
    app.register_blueprint(login_routes)
    app.register_blueprint(user_routes)
    with app.app_context():
        init_bcrypt()
        # init_jwt()
    JWTManager(app)
    return app