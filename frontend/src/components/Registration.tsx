import React from 'react'
import { useState } from 'react'
import { Box, FormControl, TextField, Stack, Button } from '@mui/material'
import loginService from '../services/login'
import { AxiosError } from 'axios'
import { useStateValue } from '../state/state'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const [newName, setNewName] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [, dispatch] = useStateValue()
    const navigate = useNavigate()

    const handleRegister = async (event: any) => {
        event.preventDefault()
        if (newPassword !== confirmPassword) {
            dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Passwords do not match.", alertType: 'error' } })
        } else {
            try {
                const newUser = {
                    name: newName,
                    username: newUsername,
                    password: newPassword
                }
                const response = await loginService.createUser(newUser)
                console.log(response)
                setNewName('')
                setNewUsername('')
                setNewPassword('')
                setConfirmPassword('')
                dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Account successfully created!", alertType: 'success' } })
                navigate("/")
            } catch (error: unknown) {
                let message = null
                console.log(error)
                if (error instanceof AxiosError) {
                    message = error?.response?.data.error
                }
                if (message == null || message === '') {
                    message = "Something went wrong."
                }
                dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: message, alertType: 'error' } })
            }
        }
    }

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={8}>
            <FormControl sx={{ p: 2 }}>
                <h2>New User Registration</h2>
                <Stack spacing={2}>
                    <TextField
                        id="outlined-name"
                        label="Name"
                        value={newName}
                        onChange={({ target }) => setNewName(target.value)}
                        required={true}
                    />
                    <TextField
                        id="outlined-username"
                        label="Username"
                        value={newUsername}
                        onChange={({ target }) => setNewUsername(target.value)}
                        required={true}
                    />
                    <TextField
                        id="outlined-password"
                        label="Password"
                        onChange={({ target }) => setNewPassword(target.value)}
                        required={true}
                        type="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        id="outlined-confirmPassword"
                        label="Confirm password"
                        onChange={({ target }) => setConfirmPassword(target.value)}
                        required={true}
                        type="password"
                        autoComplete="current-password"
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={handleRegister}>
                            Register
                        </Button>
                        <Button variant="text" onClick={() => {
                            navigate("/")
                        }}>
                            Go back to login
                        </Button>
                    </Stack>
                </Stack>
            </FormControl>
        </Box>
    )
}

export default Registration