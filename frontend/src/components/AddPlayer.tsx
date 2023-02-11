import React from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useStateValue } from '../state/state'
import { AxiosError } from 'axios'
import userService from '../services/user'

const AddPlayerButton = () => {
    const [, dispatch] = useStateValue()

    const handleClick = async (event: any) => {
        event.preventDefault()
        console.log('clicked')
        try {
            const data = await userService.addPlayer("Jayson Tatum")
            console.log(data)
        } catch (error: unknown) {
            let message = null
            if (error instanceof AxiosError) {
                message = error?.response?.data.error
            }
            if (message == null || message === '') {
                message = "Something went wrong."
            }
            dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: message, alertType: 'error' } })
        }
    }

    return (
        <Button 
        variant={'contained'} 
        sx={{ 
            textTransform: 'none', 
            backgroundColor: "#DCDCDC", 
            color: "black", 
            ":hover": { backgroundColor: "lightgray" },
            maxHeight: '75px' 
        }} 
        onClick={handleClick} 
        endIcon={<AddIcon />}>
            Add Player
        </Button>
    )
}

export default AddPlayerButton