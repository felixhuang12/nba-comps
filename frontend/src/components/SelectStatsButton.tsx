import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SelectStatsButton = () => {
    const navigate = useNavigate()

    return (
        <Button
            variant="contained"
            sx={{ alignContent: "center", textTransform: 'none', minWidth: 0, alignSelf: "flex-begin", marginTop: 2, marginLeft: 2 }}
            onClick={() => navigate("/selectstats")}
            endIcon={<EditIcon />}>
            Edit Displayed Stats
        </Button>
    )
}

export default SelectStatsButton