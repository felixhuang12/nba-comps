import React from 'react'
import { useStateValue, initialState } from '../state/state'
import { Button, Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import { AxiosError } from 'axios'

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const [, dispatch] = useStateValue()
    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInNBACompsUser')
        dispatch({ type: "RESET_STATE", payload: initialState })
        dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Logged out successfully.", alertType: 'success' } })
        handleClose()
        navigate("/")
    }

    const handleDeleteAccount = async (event: React.MouseEvent) => {
        event.preventDefault()
        if (window.confirm('Delete account? All of your data will be lost.')) {
            try {
                await userService.deleteUser()
                window.localStorage.removeItem('loggedInNBACompsUser')
                dispatch({ type: "RESET_STATE", payload: initialState })
                dispatch({ type: "SET_NOTIFICATION_MESSAGE", payload: { message: "Successfully deleted account.", alertType: "success" } })
                navigate("/")
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
        handleClose()
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Button
                id="basic-button"
                variant="contained"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    alignContent: "center",
                    textTransform: 'none',
                    minWidth: 0,
                    alignSelf: "flex-end",
                    marginTop: 2,
                    marginRight: 2
                }}
                endIcon={<SettingsIcon />}
            >
                User Settings
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleDeleteAccount}>
                    Delete account
                    <DeleteOutlineIcon sx={{ pl: 1 }} />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    Logout
                    <LogoutIcon sx={{ pl: 1 }} />
                </MenuItem>
            </Menu>
        </div>
    )
}

export default AccountMenu