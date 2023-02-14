import React from 'react'
import { useState } from 'react'
import { Box, FormControl, TextField, Stack, Button } from '@mui/material'
import loginService from '../services/login'
import userService from '../services/user'
import { LoggedInUser } from '../types'
import LogoutIcon from '@mui/icons-material/Logout'
import { AxiosError } from 'axios'
import { useStateValue } from '../state/state'

// interface LoginProps extends RegistrationProps {
//     setUser?: (user: LoggedInUser) => void
// }

interface AccountPageProps {
    visible: boolean,
    setLoginVisible: (b: boolean) => void,
    setRegisterVisible: (b: boolean) => void,
}

const MainLogin = () => {
    const [loginVisible, setLoginVisible] = useState(true)
    const [registerVisible, setRegisterVisible] = useState(false)

    return (
        <Box>
            {loginVisible
                ? <Login visible={loginVisible} setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} />
                : <Registration visible={registerVisible} setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} />}
        </Box>

    )
}

const Login = ({ visible, setLoginVisible, setRegisterVisible }: AccountPageProps) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [, dispatch] = useStateValue()

    const handleLogin = async (event: any) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password }) as LoggedInUser
            dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Success! Logged in.", alertType: 'success' } })
            dispatch({ type: "SET_LOGGED_IN_USER", payload: user })
            window.localStorage.setItem('loggedInNBACompsUser', JSON.stringify(user))
            userService.setToken(user.token)
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

    return (
        <Box display={(visible ? "flex" : "none")} justifyContent={"center"} alignItems={"center"} marginTop={16}>
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
                            setRegisterVisible(true)
                            setLoginVisible(false)
                        }}>
                            New? Register Here
                        </Button>
                    </Stack>
                </Stack>
            </FormControl>
        </Box>
    )
}

const Logout = () => {
    const [, dispatch] = useStateValue()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInNBACompsUser')
        dispatch({ type: "SET_LOGGED_IN_USER", payload: {} as LoggedInUser })
        dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Logged out successfully.", alertType: 'success' } })
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

const Registration = ({ visible, setLoginVisible, setRegisterVisible }: AccountPageProps) => {
    const [newName, setNewName] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [, dispatch] = useStateValue()

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
                setLoginVisible(true)
                setRegisterVisible(false)
                setNewName('')
                setNewUsername('')
                setNewPassword('')
                setConfirmPassword('')
                dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Account successfully created!", alertType: 'success' } })
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
        <Box display={(visible ? "flex" : "none")} justifyContent={"center"} alignItems={"center"} marginTop={8}>
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
                            setLoginVisible(true)
                            setRegisterVisible(false)
                        }}>
                            Go back to login
                        </Button>
                    </Stack>
                </Stack>
            </FormControl>
        </Box>
    )
}

export { MainLogin, Logout }