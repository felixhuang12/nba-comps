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
import calcHighestStats from '../services/highs'

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
    const [highs, setHighs] = useState()

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

    useEffect(() => {
        const calc = calcHighestStats(state.players)
        setHighs(calc)
    }, [state.players])

    console.log(state.user)
    console.log(state.players)
    console.log(highs)

    return (
        <Box>
            <Header bg={"#DCDCDC"} />
            <Notification />
            {state.user !== null && state.user !== undefined && Object.keys(state.user).length !== 0 && state.user.username !== ''
                ? <Stack display={"flex"} justifyContent={"center"} alignContent={"flex-end"} maxWidth={"100%"}>
                    <Logout />
                    <Stack sx={{ p: 4 }} direction={"row"} spacing={8} justifyContent={"center"} alignItems={"flex-start"} maxWidth={"100%"} minWidth={0}>
                        {state.players.length !== 0 && <StatLabels />}
                        {state.players.map((player: Player) => (player.id !== undefined && highs !== undefined &&
                            <PlayerCard key={player.id} player={player} highs={highs} />)
                        )}
                        {state.players.length < 3 && <AddPlayerButton />}
                    </Stack>
                </Stack>
                : <MainLogin />}
        </Box>
    )
}

export default Main