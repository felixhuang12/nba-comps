from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import playerdashboardbylastngames
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static import players

class DataRetriever:
    def __init__(self):
        pass

    def getCommonPlayerInfos(self, playerIDs: list):
        common_infos = []
        for playerID in playerIDs:
            common_infos.append(self.getCommonPlayerInfo(playerID=playerID))
        return common_infos
            
    def getCommonPlayerInfo(self, playerID: str):
        player = commonplayerinfo.CommonPlayerInfo(player_id=playerID)
        df = player.common_player_info.get_data_frame()
        info = {
            "id": int(df.iloc[0][0]),
            "name": df.iloc[0][3],
            "position": df.iloc[0][15],
            "teamAbbv": df.iloc[0][20],
            "jerseyNum": int(df.iloc[0][14])
        }
        return info

    def getAllPlayersStatAverages(self, playerIDs: list):
        stats = []
        for playerID in playerIDs:
            stats.append(self.getIndividualPlayerStatAverages(playerID=playerID))
        return stats

    def getIndividualPlayerStatAverages(self, playerID: int):
        player = playercareerstats.PlayerCareerStats(player_id=playerID)
        df = player.get_data_frames()[0]
        current_season = df.loc[len(df)-1]
        gp = current_season["GP"]
        stats = {
            "gp": gp.item(),
            "mpg": round(current_season["MIN"]/gp, 1).item(),
            "ppg": round(current_season["PTS"]/gp, 1).item(),
            "apg": round(current_season["AST"]/gp, 1).item(),
            "rpg": round(current_season["REB"]/gp, 1).item(),
            "ft_pct": round(current_season["FT_PCT"]*100, 1),
            "fg2_pct": round((current_season["FGM"]-current_season["FG3M"])*100/(current_season["FGA"]-current_season["FG3A"]), 1).item(),
            "fg3_pct": round(current_season["FG3_PCT"]*100, 1).item(),
            "fg_pct": round(current_season["FG_PCT"]*100, 1).item(),
            "ts_pct": round(current_season["PTS"]*100/(2*(current_season["FGA"]+0.44*current_season["FTA"])), 1).item(),
            "spg": round(current_season["STL"]/gp, 1).item(),
            "bpg": round(current_season["BLK"]/gp, 1).item(),
            "tpg": round(current_season["TOV"]/gp, 1).item()
        }
        return stats

    def getAllPlayersLast10GamesStatAverages(self, playerIDs: list):
        stats = []
        for playerID in playerIDs:
            stats.append(self.getIndividualPlayerLast10GamesStatAverages(playerID=playerID))
        return stats

    def getIndividualPlayerLast10GamesStatAverages(self, playerID: int):
        player = playerdashboardbylastngames.PlayerDashboardByLastNGames(player_id=playerID)
        player_last10 = player.last10_player_dashboard.get_data_frame()
        player_stats = player_last10.loc[0]
        gp = player_stats["GP"]
        stats = {
            "gp": 10,
            "mpg": round(player_stats["MIN"]/gp, 1).item(),
            "ppg": round(player_stats["PTS"]/gp, 1).item(),
            "apg": round(player_stats["AST"]/gp, 1).item(),
            "rpg": round(player_stats["REB"]/gp, 1).item(),
            "ft_pct": round(player_stats["FT_PCT"]*100, 1).item(),
            "fg2_pct": round((player_stats["FGM"]-player_stats["FG3M"])*100/(player_stats["FGA"]-player_stats["FG3A"]), 1).item(),
            "fg3_pct": round(player_stats["FG3_PCT"]*100, 1).item(),
            "fg_pct": round(player_stats["FG_PCT"]*100, 1).item(),
            "ts_pct": round(player_stats["PTS"]*100/(2*(player_stats["FGA"]+0.44*player_stats["FTA"])), 1).item(),
            "spg": round(player_stats["STL"]/gp, 1).item(),
            "bpg": round(player_stats["BLK"]/gp, 1).item(),
            "tpg": round(player_stats["TOV"]/gp, 1).item()
        }
        return stats

    def getAllActivePlayers(self):
        return players.get_active_players()

    def getPlayerIDFromName(self, full_name: str):
        players = self.getAllActivePlayers()
        player = {}
        for p in players:
            if str(p["full_name"]).lower() == full_name.lower():
                player = p
                break
        if not player:
            return None
        return player["id"]
    
    def getAggregatePlayerInfo(self, playerID: int):
        common_info = self.getCommonPlayerInfo(playerID=playerID)
        stat_avgs = self.getIndividualPlayerStatAverages(playerID=playerID)
        last_10_stats_avgs = self.getIndividualPlayerLast10GamesStatAverages(playerID=playerID)
        return [common_info, stat_avgs, last_10_stats_avgs]