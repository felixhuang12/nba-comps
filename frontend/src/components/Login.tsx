import React from 'react'
import { useEffect, useState } from 'react'
import { Box, FormControl, TextField, Stack, Button } from '@mui/material'
import loginService from '../services/login'
import userService from '../services/user'
import { LoggedInUser } from '../types'
import LogoutIcon from '@mui/icons-material/Logout'

type LoginProps = {
    visible: boolean,
    setLoginVisible: (b: boolean) => void,
    setRegisterVisible: (b: boolean) => void,
    setUser: (user: LoggedInUser) => void
}

const MainLogin = ({ setUser }: { setUser: (user: LoggedInUser) => void }) => {
    const [loginVisible, setLoginVisible] = useState(true)
    const [registerVisible, setRegisterVisible] = useState(false)

    return (
        (loginVisible
            ? <Login visible={loginVisible} setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} setUser={setUser} />
            : <Registration visible={registerVisible} setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} />)
    )
}

const Login = ({ visible, setLoginVisible, setRegisterVisible, setUser }: LoginProps) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: any) => {
        event.preventDefault()
        setLoginVisible(false)
        setRegisterVisible(false)
        const user = await loginService.login({ username, password }) as LoggedInUser
        window.localStorage.setItem('loggedInNBACompsUser', JSON.stringify(user))
        userService.setToken(user.token)
        setUser(user)
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

const Logout = ({ setUser }: { setUser: (user: LoggedInUser) => void }) => {

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInNBACompsUser')
        setUser({
            name: '',
            username: '',
            token: ''
        })
        // setSuccessMessage('Logout successful')
        // setTimeout(() => {
        //     setSuccessMessage(null)
        // }, 3000)
    }

    return (
        <Button variant="contained" sx={{ alignContent: "center", textTransform: 'none', maxWidth: "100px", alignSelf: "flex-end", padding: 1, marginTop: 2, marginRight: 2 }} onClick={handleLogout}>
            Logout
            <LogoutIcon sx={{ paddingLeft: 1 }} fontSize={"small"} />
        </Button>
    )
}

const Registration = ({ visible, setLoginVisible, setRegisterVisible }: { visible: boolean, setLoginVisible: (b: boolean) => void, setRegisterVisible: (b: boolean) => void }) => {
    const [newName, setNewName] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        // loginService.test().then((data: any) => {
        //     console.log('hit api')
        //     console.log(data)
        // })
    }, [])

    const handleRegister = async (event: any) => {
        event.preventDefault()
        if (newPassword !== confirmPassword) {
            console.log('Password incorrect')
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
                // setSuccessMessage(`Blog account with username ${response.username} created.`)
                // setTimeout(() => {
                //     setSuccessMessage(null)
                // }, 3000)
            } catch (error: unknown) {
                // setErrorMessage(error.response.data.error)
                // setTimeout(() => {
                //     setErrorMessage(null)
                // }, 3000)
                console.log(error)
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