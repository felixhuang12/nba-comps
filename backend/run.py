from app import create_app
from app.views import player_routes

app = create_app()
app.register_blueprint(player_routes)

if __name__ == "__main__":
    app.run(debug=True)