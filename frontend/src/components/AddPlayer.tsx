import React from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const AddPlayerButton = () => {
    return (
        <Button onClick={() => console.log('add clicked')}>
            <AddIcon />
        </Button>
    )
}

export default AddPlayerButton