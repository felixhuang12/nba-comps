import React from 'react'
import { useState } from 'react'
import { Box, FormControl, TextField, Stack, Button } from '@mui/material'
import loginService from '../services/login'
import userService from '../services/user'
import { LoggedInUser } from '../types'
import { AxiosError } from 'axios'
import { useStateValue } from '../state/state'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [, dispatch] = useStateValue()
    const navigate = useNavigate()

    const handleLogin = async (event: any) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password }) as LoggedInUser
            dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Success! Logged in.", alertType: 'success' } })
            dispatch({ type: "SET_LOGGED_IN_USER", payload: user })
            window.localStorage.setItem('loggedInNBACompsUser', JSON.stringify(user))
            userService.setToken(user.token)
            navigate("/home")
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
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={16}>
            <FormControl sx={{ p: 2 }}>
                <h2>Log In</h2>
                <Stack spacing={2}>
                    <TextField
                        id="outlined-username"
                        label="Username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        required={true}
                    />
                    <TextField
                        id="outlined-password"
                        label="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        required={true}
                        type="password"
                        autoComplete="current-password"
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button variant="text" onClick={() => {
                            navigate("/register")
                        }}>
                            New? Register Here
                        </Button>
                    </Stack>
                </Stack>
            </FormControl>
        </Box>
    )
}


export default Login