export interface Stats {
    ppg: number,
    apg: number,
    rpg: number,
    fg_pct: number,
    fg2_pct: number,
    fg3_pct: number,
    ft_pct: number,
    ts_pct: number
}

export interface HighStats {
    ppg: number,
    apg: number,
    rpg: number,
    fg_pct: number,
    fg2_pct: number,
    fg3_pct: number,
    ft_pct: number,
    ts_pct: number,
    lastppg: number,
    lastapg: number,
    lastrpg: number,
    lastfg_pct: number,
    lastfg2_pct: number,
    lastfg3_pct: number,
    lastft_pct: number,
    lastts_pct: number
}

export interface CommonPlayerInfo {
    id: number,
    name: string,
    position: string,
    teamAbbv: string,
    jerseyNum: number
}

export interface Player {
    id: number,
    commonPlayerInfo: CommonPlayerInfo
    seasonStatistics: Stats,
    last10Statistics: Stats
}

export interface ActivePlayerRef {
    id: number,
    full_name: string
}

export interface NewUser {
    name: string,
    username: string,
    password: string
}

export interface User extends LoggedInUser {
    players?: Player[]
}

export interface LoggedInUser {
    name: string,
    username: string,
    token: string
}