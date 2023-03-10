export interface Stats {
    ppg: number,
    apg: number,
    rpg: number,
    fg_pct: number,
    fg2_pct: number,
    fg3_pct: number,
    ft_pct: number,
    ts_pct: number,
    gp: number,
    mpg: number,
    spg: number,
    bpg: number,
    tpg: number
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
    gp: number,
    mpg: number,
    spg: number,
    bpg: number,
    tpg: number,
    lastppg: number,
    lastapg: number,
    lastrpg: number,
    lastfg_pct: number,
    lastfg2_pct: number,
    lastfg3_pct: number,
    lastft_pct: number,
    lastts_pct: number,
    lastmpg: number,
    lastspg: number,
    lastbpg: number,
    lasttpg: number
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

export interface StatsDisplay {
    show_ppg?: boolean,
    show_apg?: boolean,
    show_rpg?: boolean,
    show_fg_pct?: boolean,
    show_fg2_pct?: boolean,
    show_fg3_pct?: boolean,
    show_ft_pct?: boolean,
    show_ts_pct?: boolean,
    show_gp?: boolean,
    show_mpg?: boolean,
    show_spg?: boolean,
    show_bpg?: boolean,
    show_tpg?: boolean,
    show_lastppg?: boolean,
    show_lastapg?: boolean,
    show_lastrpg?: boolean,
    show_lastfg_pct?: boolean,
    show_lastfg2_pct?: boolean,
    show_lastfg3_pct?: boolean,
    show_lastft_pct?: boolean,
    show_lastts_pct?: boolean,
    show_lastmpg?: boolean,
    show_lastspg?: boolean,
    show_lastbpg?: boolean,
    show_lasttpg?: boolean
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