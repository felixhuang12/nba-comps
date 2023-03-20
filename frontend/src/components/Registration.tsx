import React from 'react'
import { useState } from 'react'
import { Box, FormControl, TextField, Stack, Button } from '@mui/material'
import loginService from '../services/login'
import { AxiosError } from 'axios'
import { useStateValue } from '../state/state'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'

const Registration = () => {
    const [newName, setNewName] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerLoading, setRegisterLoading] = useState(false)
    const [, dispatch] = useStateValue()
    const navigate = useNavigate()

    const handleRegister = async (event: any) => {
        event.preventDefault()
        if (!newName || !newUsername) {
            dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Name and username must be non-empty.", alertType: 'error' } })
        } else if (!newPassword) {
            dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Password must be non-empty.", alertType: 'error' } })
        } else if (newPassword !== confirmPassword) {
            dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Passwords do not match.", alertType: 'error' } })
        } else {
            try {
                setRegisterLoading(true)
                const newUser = {
                    name: newName,
                    username: newUsername,
                    password: newPassword
                }
                await loginService.createUser(newUser)
                setNewName('')
                setNewUsername('')
                setNewPassword('')
                setConfirmPassword('')
                dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Account successfully created!", alertType: 'success' } })
                navigate("/")
            } catch (error: unknown) {
                setRegisterLoading(false)
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
                        {registerLoading
                            ? <LoadingButton loading variant="outlined" />
                            : <Button variant="contained" onClick={handleRegister}>
                                Register
                            </Button>}
                        <Button variant="text" onClick={() => {
                            setRegisterLoading(false)
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