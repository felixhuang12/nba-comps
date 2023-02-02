import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'

// ts% = pts/(2 * (fga + (0.44 * fta)))

interface Stats {
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


interface Player {
    id: number,
    seasonStatistics: Stats,
    last10Statistics: Stats
}

const Player = ({ id, seasonStatistics, last10Statistics }: Player) => {
    const [number, setNumber] = useState(id)
    const [seasonStats, setSeasonStats] = useState(seasonStatistics)
    const [last10Stats, setLast10Stats] = useState(last10Statistics)

    return (
        <Box sx={{ backgroundColor: "red" }}>
            {number}
            {seasonStats.pts}
        </Box>
    )
}

export default Player