import React from 'react'
import { useStateValue } from '../state/state'
import { LoggedInUser, Player } from '../types'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const [, dispatch] = useStateValue()
    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInNBACompsUser')
        dispatch({ type: "SET_LOGGED_IN_USER", payload: {} as LoggedInUser })
        dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Logged out successfully.", alertType: 'success' } })
        dispatch({ type: "SET_PLAYERS", payload: { players: [] as Player[] } })
        navigate("/")
    }

    return (
        <Button
            variant="contained"
            sx={{ alignContent: "center", textTransform: 'none', maxWidth: "100px", minWidth: 0, alignSelf: "flex-end", marginTop: 2, marginRight: 2 }}
            onClick={handleLogout}
            endIcon={<LogoutIcon />}>
            Logout
        </Button>
    )
}

export default Logout