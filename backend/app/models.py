from typing import List, Optional
from pydantic import BaseModel

class CommonPlayerInfo(BaseModel):
    id: int
    name: str
    position: str
    teamAbbv: str
    jerseyNum: int

class Stats(BaseModel):
    gp: int
    mpg: float
    ppg: float
    apg: float
    rpg: float
    fg_pct: float
    fg2_pct: float
    fg3_pct: float
    ft_pct: float
    ts_pct: float
    spg: float
    bpg: float
    tpg: float

class Player(BaseModel):
    id: int
    commonPlayerInfo: CommonPlayerInfo
    seasonStatistics: Stats
    last10Statistics: Stats

class User(BaseModel):
    name: str
    username: str
    passwordHash: str
    players: Optional[List[int]] = []
