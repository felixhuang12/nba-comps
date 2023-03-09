import React from 'react'
import { Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import PlayerCard from './Player'
import Logout from './Logout'
import AddPlayerButton from './AddPlayer'
import StatLabels from './StatLabels'
import { Player } from '../types'
import { useStateValue } from '../state/state'
import userService from '../services/user'
import calcHighestStats from '../services/highs'

const Home = () => {
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

    return (
        <Stack display={"flex"} justifyContent={"center"} alignContent={"flex-end"} maxWidth={"100%"}>
            <Logout />
            <Stack sx={{ p: 4 }} direction={"row"} spacing={8} justifyContent={"center"} alignItems={"flex-start"} maxWidth={"100%"} minWidth={0}>
                {state.players.length !== 0 && <StatLabels />}
                {state.players.map((player: Player) => (player.id !== undefined && highs !== undefined &&
                    <PlayerCard key={player.id} player={player} highs={highs} />)
                )}
                {state.players.length < 3 && <AddPlayerButton />}
            </Stack>
        </Stack>
    )
}

export default Home