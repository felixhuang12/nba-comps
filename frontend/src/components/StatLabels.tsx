import React from 'react'
import { Stack, Box } from '@mui/material'
import { useStateValue } from '../state/state'

const StatLabels = () => {
    const [state, ] = useStateValue()

    return (
        <Stack spacing={2} sx={{ marginTop: "280px" }}>
            <Box sx={{ backgroundColor: "lightgray", p: 1, width: "100%" }}>2022-2023 Regular Season Stats</Box>
            <Stack spacing={2}>
                <Box display={state.statsToShow.show_gp ? "flex" : 'none'}>GP</Box>
                <Box display={state.statsToShow.show_mpg ? "flex" : 'none'}>MPG</Box>
                <Box display={state.statsToShow.show_ppg ? "flex" : 'none'}>PPG</Box>
                <Box display={state.statsToShow.show_apg ? "flex" : 'none'}>APG</Box>
                <Box display={state.statsToShow.show_rpg ? "flex" : 'none'}>RPG</Box>
                <Box display={state.statsToShow.show_fg3_pct ? "flex" : 'none'}>3P%</Box>
                <Box display={state.statsToShow.show_ft_pct ? "flex" : 'none'}>FT%</Box>
                <Box display={state.statsToShow.show_spg ? "flex" : 'none'}>SPG</Box>
                <Box display={state.statsToShow.show_bpg ? "flex" : 'none'}>BPG</Box>
                <Box display={state.statsToShow.show_tpg ? "flex" : 'none'}>TPG</Box>
            </Stack>
            <Box sx={{ backgroundColor: "lightgray", p: 1, width: "100%" }}>Last 10 Games</Box>
            <Stack spacing={2}>
                <Box display={state.statsToShow.show_lastmpg ? "flex" : 'none'}>MPG</Box>
                <Box display={state.statsToShow.show_lastppg ? "flex" : 'none'}>PPG</Box>
                <Box display={state.statsToShow.show_lastapg ? "flex" : 'none'}>APG</Box>
                <Box display={state.statsToShow.show_lastrpg ? "flex" : 'none'}>RPG</Box>
                <Box display={state.statsToShow.show_lastfg3_pct ? "flex" : 'none'}>3P%</Box>
                <Box display={state.statsToShow.show_lastft_pct ? "flex" : 'none'}>FT%</Box>
                <Box display={state.statsToShow.show_lastspg ? "flex" : 'none'}>SPG</Box>
                <Box display={state.statsToShow.show_lastbpg ? "flex" : 'none'}>BPG</Box>
                <Box display={state.statsToShow.show_lasttpg ? "flex" : 'none'}>TPG</Box>
            </Stack>
            <Box sx={{ backgroundColor: "lightgray", p: 1, width: "100%" }}>Season Shooting Percentages</Box>
            <Stack spacing={2}>
                <Box display={state.statsToShow.show_fg2_pct ? "flex" : 'none'}>2-Point</Box>
                <Box display={state.statsToShow.show_fg3_pct ? "flex" : 'none'}>3-Point</Box>
                <Box display={state.statsToShow.show_fg_pct ? "flex" : 'none'}>Total</Box>
                <Box display={state.statsToShow.show_ts_pct ? "flex" : 'none'}>True Shooting</Box>
            </Stack>
        </Stack>
    )
}

export default StatLabels