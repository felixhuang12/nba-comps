import React from 'react'
import { useState } from 'react'
import { Box, FormControl, TextField, Stack, Button } from '@mui/material'

const MainLogin = () => {
    const [loginVisible, setLoginVisible] = useState(true)
    const [registerVisible, setRegisterVisible] = useState(false)

    return (
        (loginVisible
            ? <Login visible={loginVisible} setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} />
            : <Registration visible={registerVisible} setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} />)
    )
}

const Login = ({ visible, setLoginVisible, setRegisterVisible }: { visible: boolean, setLoginVisible: (b: boolean) => void, setRegisterVisible: (b: boolean) => void }) => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: any) => {
        event.preventDefault()
        console.log('hello')
        setLoginVisible(false)
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
                        <Button variant="outlined" onClick={() => {
                            setRegisterVisible(true)
                            setLoginVisible(false)
                        }}>
                            Register
                        </Button>
                    </Stack>
                </Stack>
            </FormControl>
        </Box>
    )
}

const Registration = ({ visible, setLoginVisible, setRegisterVisible }: { visible: boolean, setLoginVisible: (b: boolean) => void, setRegisterVisible: (b: boolean) => void }) => {
    const [newName, setNewName] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = async (event: any) => {
        event.preventDefault()
        console.log('hello')
        setRegisterVisible(false)
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

export default MainLogin