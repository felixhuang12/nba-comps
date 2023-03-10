import React, { useState, useEffect, Fragment } from 'react'
import { Button, TextField, Stack, Autocomplete, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useStateValue } from '../state/state'
import { AxiosError } from 'axios'
import userService from '../services/user'
import { ActivePlayerRef } from '../types'
import nba_api_client from '../services/player'
import CircularProgress from '@mui/material/CircularProgress'
import { LoadingButton } from '@mui/lab'

const AddPlayerButton = () => {
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
                : <Box textAlign={"center"} sx={{ textDecoration: "underline" }}>Search Player</Box>}
            <Search visible={searchInputVisible} setVisible={setSearchInputVisible} />
        </Stack>

    )
}

const Search = ({ visible, setVisible }: { visible: boolean, setVisible: (b: boolean) => void }) => {
    const [, dispatch] = useStateValue()
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<readonly ActivePlayerRef[]>([])
    const [addButtonLoading, setAddButtonLoading] = useState(false)
    const loading = open && options.length === 0

    useEffect(() => {
        if (open) {
            nba_api_client.getAllActiveNBAPlayers().then((data) => {
                try {
                    setOptions(data.active_players)
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
            })
        }
    }, [open, dispatch])

    const handleClick = async (event: any) => {
        event.preventDefault()
        try {
            setAddButtonLoading(true)
            const data = await userService.addPlayer(query)
            const updatedPlayers = data.data.players
            setVisible(false)
            dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Successfully added player.", alertType: "success" } })
            dispatch({ type: "SET_PLAYERS", payload: { players: updatedPlayers } })
            setAddButtonLoading(false)
        } catch (error: unknown) {
            let message = null
            console.log(error)
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

    if (visible) {
        return (
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    id="player-query"
                    freeSolo
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    options={[...options].map((player) => player.full_name)}
                    renderInput={(params) =>
                        <TextField {...params} label="Player name" InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                            ),
                        }} />
                    }
                    onInputChange={(event, value, reason) => setQuery(value)}
                    loading={loading}
                />
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                    {addButtonLoading
                        ? <LoadingButton loading variant="outlined" />
                        : <Button
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
                        </Button>}
                    <Button
                        variant={'outlined'}
                        sx={{
                            textTransform: 'none',
                            maxHeight: '75px'
                        }}
                        color="error"
                        onClick={() => {
                            setVisible(false)
                            setAddButtonLoading(false)
                        }}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        )
    }
    return null
}

export default AddPlayerButton