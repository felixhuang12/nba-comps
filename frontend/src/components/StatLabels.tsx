import React from 'react'
import { Stack, Box } from '@mui/material'

const StatLabels = () => {
    return (
        <Stack spacing={2} sx={{ marginTop: 30 }}>
            <Box sx={{ backgroundColor: "lightgray", p: 1, width: "100%" }}>2022-2023 Regular Season Stats</Box>
            <Stack spacing={2}>
                <Box>PPG</Box>
                <Box>APG</Box>
                <Box>RPG</Box>
                <Box>3P%</Box>
                <Box>FT%</Box>
            </Stack>
            <Box sx={{ backgroundColor: "lightgray", p: 1, width: "100%" }}>Last 10 Games</Box>
            <Stack spacing={2}>
                <Box>PPG</Box>
                <Box>APG</Box>
                <Box>RPG</Box>
            </Stack>
            <Box sx={{ backgroundColor: "lightgray", p: 1, width: "100%" }}>Season Shooting Percentages</Box>
            <Stack spacing={2}>
                <Box>2-Point</Box>
                <Box>3-Point</Box>
                <Box>Total</Box>
                <Box>True Shooting</Box>
            </Stack>
        </Stack>
    )
}

export default StatLabels