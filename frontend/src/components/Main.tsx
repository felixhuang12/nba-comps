import React from 'react'
import { Box, Stack } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import PlayerCard from './Player'
import MainLogin from './Login'

// base url for player images: https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{player_id}.png
// example: https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203999.png -- Nikola Jokic

// base url for team logos: http://global.nba.com/media/img/teams/00/logos/{team abbreviation}_logo.svg
// example: http://global.nba.com/media/img/teams/00/logos/BOS_logo.svg -- boston celtics

const Header = ({ bg }: { bg: string }) => {
    return (
        <Box sx={{ backgroundColor: bg, height: "70px" }} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <h1 style={{ fontSize: "24px" }}>NBA Comparisons</h1>
        </Box>
    )
}

const Main = () => {

    const players = [
        {
            id: 1628369,
            seasonStats: {
                gp: 49,
                pts: 1524,
                ast: 216,
                reb: 428,
                fg3_pct: 0.357,
                ft_pct: 0.869,
                fta: 421, // for TS% calc
                fga: 1063, // for TS% calc
                fgm: 497,
                fg3a: 460,
                fg3m: 164,
                fg_pct: 0.468
            },
            last10: {
                gp: 10,
                pts: 322,
                ast: 52,
                reb: 112,
                fg3_pct: 0.376,
                ft_pct: 0.907,
                fta: 86, // for TS% calc
                fga: 228, // for TS% calc
                fgm: 103,
                fg3a: 101,
                fg3m: 38,
                fg_pct: 0.452
            }
        },
        {
            id: 203999,
            seasonStats: {
                gp: 44,
                pts: 1105,
                ast: 439,
                reb: 487,
                fg3_pct: 0.388,
                ft_pct: 0.825,
                fta: 275, // for TS% calc
                fga: 664, // for TS% calc
                fgm: 419,
                fg3a: 103,
                fg3m: 40,
                fg_pct: 0.631
            },
            last10: {
                gp: 10,
                pts: 322,
                ast: 52,
                reb: 112,
                fg3_pct: 0.376,
                ft_pct: 0.907,
                fta: 86, // for TS% calc
                fga: 228, // for TS% calc
                fgm: 103,
                fg3a: 101,
                fg3m: 38,
                fg_pct: 0.452
            }
        },
    ]
    return (
        <Box>
            <Header bg={"#DCDCDC"} />
            {/* <Stack direction={"row"} spacing={16} justifyContent={"center"} alignItems={"flex-start"} sx={{ p: 4 }}>
                <Stack spacing={2} sx={{ marginTop: 30 }}>
                    <Box sx={{ backgroundColor: "lightgray", p: 1, width: "100%" }}>2022-2023 Regular Season Stats</Box>
                    <Stack spacing={2}>
                        <Box>PPG</Box>
                        <Box>APG</Box>
                        <Box>RPG</Box>
                        <Box>3P%</Box>
                        <Box>FT%</Box>
                    </Stack>
                    <Box sx={{ backgroundColor: "lightgray", p: 1, width: "100%" }}>Last 10 Games</Box>
                    <Stack spacing={2}>
                        <Box>PPG</Box>
                        <Box>APG</Box>
                        <Box>RPG</Box>
                    </Stack>
                    <Box sx={{ backgroundColor: "lightgray", p: 1, width: "100%" }}>Season Shooting Percentages</Box>
                    <Stack spacing={2}>
                        <Box>2-Point</Box>
                        <Box>3-Point</Box>
                        <Box>Total</Box>
                        <Box>True Shooting</Box>
                    </Stack>
                </Stack>
                {players.map(player =>
                    (player.id !== undefined && <PlayerCard key={player.id} id={player.id} seasonStatistics={player.seasonStats} last10Statistics={player.last10} />)
                )}
            </Stack> */}
            <MainLogin />
        </Box>
    )
}

export default Main