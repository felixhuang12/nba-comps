import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useStateValue } from '../state/state'
import { Button } from '@mui/material'
import { Player } from '../types'
import userService from '../services/user'
import { AxiosError } from 'axios'

const DeletePlayerButton = ({player}: {player: Player}) => {
    const [, dispatch] = useStateValue()

    const handleDelete = async (event: any) => {
        event.preventDefault()
        if (window.confirm(`Remove ${player.commonPlayerInfo.name}?`)) {
            try {
                const response = await userService.deletePlayer(player.id)
                dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: `Successfully removed ${player.commonPlayerInfo.name}.`, alertType: "success" } })
                dispatch({ type: "SET_PLAYERS", payload: response.data })
            } catch (error: unknown) {
                let message = null
                if (error instanceof AxiosError) {
                    message = error?.response?.data.error
                    if (message == null || message === '') {
                        message = error?.response?.data.msg
                    }
                }
                if (message == null || message === '') {
                    message = "Something went wrong."
                }
                dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: message, alertType: 'error' } })
            }
        }
    }

    return (
        <Button
            variant={'contained'}
            disableElevation={true}
            sx={{
                textTransform: 'none',
                backgroundColor: "rgba(255, 0, 0, 0)",
                color: "red",
                ":hover": { backgroundColor: "rgba(255, 0, 0, 0.2)" },
                maxHeight: '50px',
                maxWidth: '50px',
            }}
            onClick={handleDelete}>
            <DeleteIcon />
        </Button>
    )
}

export default DeletePlayerButton