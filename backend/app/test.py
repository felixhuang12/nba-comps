from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import playergamelog

# Nikola Jokić
career = playercareerstats.PlayerCareerStats(player_id='203999')
gamelog = playergamelog.PlayerGameLog(player_id='203999', season=2023, season_type_all_star='(Regular Season)')

# pandas data frames (optional: pip install pandas)
# df = career.get_data_frames()[0]
# print(df)
# print(career.get_data_frames()[0])
print(gamelog.get_data_frames()[0])