from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import playergamelog
from nba_api.stats.endpoints import playerdashboardbylastngames

# Jayson Tatum
# career
jt_career = playercareerstats.PlayerCareerStats(player_id='1628369')
jt_df = jt_career.get_data_frames()[0]
print(jt_df)

# last 10 games
# jt_last10games = playerdashboardbylastngames.PlayerDashboardByLastNGames(player_id='1628369')
# data = jt_last10games.last10_player_dashboard.get_data_frame()
# print(data.to_string())


# Nikola Jokic
# career
# nj_career = playercareerstats.PlayerCareerStats(player_id='203999')
# nj_df = nj_career.get_data_frames()[0]
# print(nj_df)

# last 10 games

# gamelog not working...
# gamelog = playergamelog.PlayerGameLog(player_id='203999', season=2023, season_type_all_star='Regular Season')
# print(gamelog.get_data_frames()[0])