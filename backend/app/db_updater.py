import pymongo
import sys
sys.path.append('../')
import config
from nba_api_client import DataRetriever as NBA
from models import Player
import time

config = config.Config()
db_client = pymongo.MongoClient(config.MONGO_URI)
nba_client = NBA()
db = db_client["nbaComps"]
players = db["players"]
active_players = nba_client.getAllActivePlayers()

for player in active_players:
    time.sleep(1)
    print(player)
    player_data = nba_client.getAggregatePlayerInfo(playerID=player["id"])
    new_player = Player(id=player["id"], commonPlayerInfo=player_data[0], seasonStatistics=player_data[1], last10Statistics=player_data[2])
    players.replace_one({"id": player["id"]}, new_player.dict())