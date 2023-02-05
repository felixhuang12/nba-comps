export interface Stats {
    gp: number,
    pts: number,
    ast: number,
    reb: number,
    fg3_pct: number,
    ft_pct: number,
    fta: number, // for TS% calc
    fga: number, // for TS% calc
    fgm: number,
    fg3a: number,
    fg3m: number,
    fg_pct: number
}

export interface Player {
    id: number,
    seasonStatistics: Stats,
    last10Statistics: Stats
}

export interface NewUser {
    name: string,
    username: string,
    password: string
}

export interface User extends NewUser {
    players: Player[]
}

export interface LoggedInUser {
    name: string,
    username: string,
    token: string
}