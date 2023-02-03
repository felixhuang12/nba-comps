from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import playergamelog
from nba_api.stats.endpoints import playerdashboardbylastngames
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static import players

# Jayson Tatum
# career
# jt_career = playercareerstats.PlayerCareerStats(player_id='1628369')
# jt_df = jt_career.get_data_frames()[0]
# print(jt_df)

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

# scoping commonplayerinfo api
# jt_info = commonplayerinfo.CommonPlayerInfo(player_id="1628369")
# print(jt_info.common_player_info.get_data_frame().to_string())

# players api -- for use in search query when adding players
result = players.find_players_by_full_name("James")
print(result)