import React from 'react'
import { Box, Stack, Container } from '@mui/material'
import { useState, useEffect } from 'react'
import PlayerCard from './Player'
import { MainLogin, Logout } from './Login'
import AddPlayerButton from './AddPlayer'
import StatLabels from './StatLabels'
import { Player } from '../types'
import userService from '../services/user'
import Notification from './Notification'
import { useStateValue } from '../state/state'

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
    const [state, dispatch] = useStateValue()
    // const [players, setPlayers] = useState([] as Player[])

    useEffect(() => {
        const cache = window.localStorage.getItem('loggedInNBACompsUser')
        if (cache) {
            const user = JSON.parse(cache)
            userService.setToken(user.token)
            dispatch({ type: "SET_LOGGED_IN_USER", payload: user })
        }

    }, [dispatch])

    useEffect(() => {
        if (state.user !== null && Object.keys(state.user).length !== 0 && state.user.username !== '')
            userService.getPlayers(state.user).then((user_players) => {
                dispatch({ type: "SET_PLAYERS", payload: user_players })
            })
    }, [state.user, dispatch])

    console.log(state.user)
    console.log(state.players)

    return (
        <Box>
            <Header bg={"#DCDCDC"} />
            <Notification />
            {state.user !== null && state.user !== undefined && Object.keys(state.user).length !== 0 && state.user.username !== ''
                ? <Stack display={"flex"} justifyContent={"center"} alignContent={"flex-end"} maxWidth={"100%"}>
                    <Logout />
                    <Stack sx={{ p: 4 }} direction={"row"} spacing={8} justifyContent={"center"} alignItems={"flex-start"} maxWidth={"100%"} minWidth={0}>
                        {state.players.length !== 0 && <StatLabels />}
                        {state.players.map((player: Player) => (player.id !== undefined &&
                            <PlayerCard key={player.id} player={player} />)
                        )}
                        {state.players.length < 3 && <AddPlayerButton />}
                    </Stack>
                </Stack>
                : <MainLogin />}
        </Box>
    )
}

const testPlayers: Player[] = [
    {
        id: 1628369,
        commonPlayerInfo: {
            id: 1628369,
            name: "Jayson Tatum",
            position: "Forward / Guard",
            teamAbbv: "BOS",
            jerseyNum: 0
        },
        seasonStatistics: {
            ppg: 30.9,
            apg: 4.4,
            rpg: 8.7,
            fg_pct: 46.4,
            fg2_pct: 54.8,
            fg3_pct: 35.5,
            ft_pct: 87.1,
            ts_pct: 60.9
        },
        last10Statistics: {
            ppg: 31.1,
            apg: 5.3,
            rpg: 10.8,
            fg_pct: 43.4,
            fg2_pct: 49.2,
            fg3_pct: 36.9,
            ft_pct: 92.0,
            ts_pct: 59.9
        }
    },
    {
        id: 203999,
        commonPlayerInfo: {
            id: 203999,
            name: "Nikola Jokic",
            position: "Center",
            teamAbbv: "DEN",
            jerseyNum: 15
        },
        seasonStatistics: {
            ppg: 24.8,
            apg: 10.1,
            rpg: 11.3,
            fg_pct: 63.2,
            fg2_pct: 67.6,
            fg3_pct: 38.5,
            ft_pct: 63.2,
            ts_pct: 70.4
        },
        last10Statistics: {
            ppg: 23.0,
            apg: 12.2,
            rpg: 13.1,
            fg_pct: 71.7,
            fg2_pct: 75.5,
            fg3_pct: 47.1,
            ft_pct: 71.7,
            ts_pct: 78.1
        }
    },
    // {
    //     id: 1628378,
    //     commonPlayerInfo: {
    //         id: 1628378,
    //         name: "Donovan Mitchell",
    //         position: "Guard",
    //         teamAbbv: "CLE",
    //         jerseyNum: 45
    //     },
    //     seasonStatistics: {
    //         ppg: 26.9,
    //         apg: 4.9,
    //         rpg: 3.8,
    //         fg_pct: 47.2,
    //         fg2_pct: 55.0,
    //         fg3_pct: 38.7,
    //         ft_pct: 86.9,
    //         ts_pct: 61.0
    //     },
    //     last10Statistics: {
    //         ppg: 19.5,
    //         apg: 4.8,
    //         rpg: 3.4,
    //         fg_pct: 41.0,
    //         fg2_pct: 52.7,
    //         fg3_pct: 31.5,
    //         ft_pct: 85.7,
    //         ts_pct: 53.7
    //     }
    // }
]

export default Main