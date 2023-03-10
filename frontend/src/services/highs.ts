import { Player } from "../types"

const calcHighestStats = (players: Player[]) => {
    var highs = {
        gp: 0,
        mpg: 0,
        ppg: 0,
        apg: 0,
        rpg: 0,
        ft_pct: 0,
        fg2_pct: 0,
        fg3_pct: 0,
        fg_pct: 0,
        ts_pct: 0,
        spg: 0,
        bpg: 0,
        tpg: 0,
        lastppg: 0,
        lastapg: 0,
        lastrpg: 0,
        lastft_pct: 0,
        lastfg2_pct: 0,
        lastfg3_pct: 0,
        lastfg_pct: 0,
        lastts_pct: 0,
        lastmpg: 0,
        lastspg: 0,
        lastbpg: 0,
        lasttpg: 0
    } as any

    for (let i = 0; i < players.length; i++) {
        const seasonStats = players[i].seasonStatistics as any
        const last10Stats = players[i].last10Statistics as any
        
        for (var key in seasonStats) {
            if (seasonStats[key] > highs[key]) {
                highs[key] = seasonStats[key]
            }
            if (key !== "gp" && last10Stats[key] > highs[`last${key}`]) {
                highs[`last${key}`] = last10Stats[key]
            }
        }
    }
    return highs
}

export default calcHighestStats