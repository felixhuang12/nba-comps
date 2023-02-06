from typing import List, Optional
from pydantic import BaseModel

class PlayerID(BaseModel):
    id: int

class Player(BaseModel):
    id: int
    name: str
    position: str
    teamAbbv: str
    jerseyNum: int
    ppg: float
    apg: float
    rpg: float
    fg_pct: float
    fg2_pct: float
    fg3_pct: float
    ft_pct: float
    ts_pct: float
    last10_ppg: float
    last10_apg: float
    last10_rpg: float


class User(BaseModel):
    name: str
    username: str
    passwordHash: str
    players: Optional[List[PlayerID]] = []
