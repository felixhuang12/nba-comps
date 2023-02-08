import React from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const AddPlayerButton = () => {
    return (
        <Button 
        variant={'contained'} 
        sx={{ 
            textTransform: 'none', 
            backgroundColor: "#DCDCDC", 
            color: "black", 
            ":hover": { backgroundColor: "lightgray" },
            maxHeight: '75px' 
        }} 
        onClick={() => console.log('add clicked')} 
        endIcon={<AddIcon />}>
            Add Player
        </Button>
    )
}

export default AddPlayerButton