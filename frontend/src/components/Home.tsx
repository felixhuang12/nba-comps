import React from 'react'
import { Stack, Skeleton } from '@mui/material'
import { useState, useEffect } from 'react'
import PlayerCard from './Player'
import AccountMenu from './MenuSettings'
import AddPlayerButton from './AddPlayer'
import StatLabels from './StatLabels'
import { Player } from '../types'
import { useStateValue } from '../state/state'
import userService from '../services/user'
import calcHighestStats from '../services/highs'
import SelectStatsButton from './SelectStatsButton'

const Home = () => {
    const [state, dispatch] = useStateValue()
    const [highs, setHighs] = useState()
    const [loadCards, setLoadCards] = useState(true)

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
                setLoadCards(false)
                dispatch({ type: "SET_PLAYERS", payload: user_players })
            })
    }, [state.user, dispatch])

    useEffect(() => {
        const calc = calcHighestStats(state.players)
        setHighs(calc)
    }, [state.players])

    return (
        <Stack display={"flex"} justifyContent={"center"} alignContent={"flex-end"} maxWidth={"100%"}>
            <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                <SelectStatsButton />
                <AccountMenu />
            </Stack>
            {loadCards
                ? <Stack sx={{ p: 4 }} direction={"row"} spacing={8} justifyContent={"center"} alignItems={"flex-start"} maxWidth={"100%"} minWidth={0}>
                    <Skeleton variant="rectangular" width={250} height={"70vh"} sx={{ marginTop: "275px" }} />
                    <Skeleton variant="rectangular" width={225} height={"100vh"} />
                    <Skeleton variant="rectangular" width={225} height={"100vh"} />
                    <Skeleton variant="rectangular" width={225} height={"100vh"} />
                </Stack>
                : <Stack sx={{ p: 4 }} direction={"row"} spacing={8} justifyContent={"center"} alignItems={"flex-start"} maxWidth={"100%"} minWidth={0}>
                    {state.players.length !== 0 && <StatLabels />}
                    {state.players.map((player: Player) => (player.id !== undefined && highs !== undefined &&
                        <PlayerCard key={player.id} player={player} highs={highs} />)
                    )}
                    {state.players.length < 3 && <AddPlayerButton />}
                </Stack>}
        </Stack>
    )
}

export default Home