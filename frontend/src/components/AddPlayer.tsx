import React, { useState } from 'react'
import { Button, TextField, Stack, Autocomplete, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useStateValue } from '../state/state'
import { AxiosError } from 'axios'
import userService from '../services/user'

const AddPlayerButton = () => {
    const [, dispatch] = useStateValue()
    const [searchInputVisible, setSearchInputVisible] = useState(false)

    return (
        <Stack spacing={1}>
            {!searchInputVisible
                ? <Button
                    variant={'contained'}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: "#DCDCDC",
                        color: "black",
                        ":hover": { backgroundColor: "lightgray" },
                        maxHeight: '75px'
                    }}
                    onClick={() => setSearchInputVisible(true)}
                    endIcon={!searchInputVisible && <AddIcon />}>
                    Add Player
                </Button>
                : <Box textAlign={"center"} sx={{textDecoration: "underline"}}>Search Player</Box>}
            <Search visible={searchInputVisible} setVisible={setSearchInputVisible} />
        </Stack>

    )
}

const Search = ({ visible, setVisible }: { visible: boolean, setVisible: (b: boolean) => void }) => {
    const [state, dispatch] = useStateValue()
    const [query, setQuery] = useState('')

    const handleClick = async (event: any) => {
        event.preventDefault()
        try {
            const data = await userService.addPlayer(query)
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

    if (visible) {
        return (
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    id="player-query"
                    freeSolo
                    options={state.players.map((player) => player.id)}
                    renderInput={(params) => <TextField {...params} label="Player name" />}
                    onInputChange={(event, value, reason) => setQuery(value)}
                />
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
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
                        Add
                    </Button>
                    <Button
                        variant={'outlined'}
                        sx={{
                            textTransform: 'none',
                            maxHeight: '75px'
                        }}
                        color="error"
                        onClick={() => setVisible(false)}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        )
    }
    return null
}

export default AddPlayerButton