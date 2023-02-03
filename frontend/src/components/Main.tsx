import React from 'react'
import { Box, Stack } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Player from './Player'

// base url for player images: https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{player_id}.png
// example: https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203999.png -- Nikola Jokic

// base url for team logos: http://global.nba.com/media/img/teams/00/logos/{team abbreviation}_logo.svg
// example: http://global.nba.com/media/img/teams/00/logos/BOS_logo.svg -- boston celtics

const Header = ({ bg }: {bg: string}) => {
    return (
        <Box sx={{ backgroundColor: bg, height: "70px" }} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <h1 style={{ fontSize: "24px" }}>NBA Comparisons</h1>
        </Box>
    )
}

const Main = () => {
    // const [data, setData] = useState("") // players
    // useEffect(() => {
    //     axios.get('/api').then((data: any) => {
    //         setData(data)
    //     })
    // }, [])

    // console.log(data)

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
                fga: 103, // for TS% calc
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
        }
    ]
    return (
        <Box>
            <Header bg={"#DCDCDC"} />
            <Stack direction={"row"} spacing={16} justifyContent={"center"} alignItems={"flex-start"} sx={{p: 4}}>
                {players.map(player =>
                    (player.id !== undefined && <Player key={player.id} id={player.id} seasonStatistics={player.seasonStats} last10Statistics={player.last10} />)
                )}
            </Stack>

        </Box>
    )
}

export default Main