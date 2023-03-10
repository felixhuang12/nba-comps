import React from 'react'
import { Stack, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useStateValue } from '../state/state'
import { useNavigate } from 'react-router-dom'
import { StatsDisplay } from '../types'

const SelectStats = () => {
    const [state, dispatch] = useStateValue()
    const navigate = useNavigate()

    const handleChange = (stat: any) => {
        const key: keyof StatsDisplay = stat
        dispatch({ type: "SET_STATS_TO_DISPLAY", payload: { ...state.statsToShow, [key]: !state.statsToShow[key]} })
    }

    return (
        <Stack display={"flex"} justifyContent={"center"} alignContent={"center"}>
            <Button
                variant="contained"
                sx={{ alignContent: "center", textTransform: 'none', minWidth: 0, alignSelf: "flex-start", marginTop: 2, marginLeft: 2 }}
                onClick={() => navigate("/home")}
                endIcon={<ArrowBackIcon />}>
                Go back
            </Button>
            <h2 style={{ textAlign: "center" }}>Statistics to Display</h2>
            <Stack display={"flex"} justifyContent={"center"} alignContent={"center"} direction={"row"} spacing={4}>
                <FormGroup sx={{ alignItems: "center" }}>
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_mpg} onChange={() => handleChange("show_mpg")} />} label="Minutes Per Game (MPG)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_ppg} onChange={() => handleChange("show_ppg")} />} label="Points Per Game (PPG)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_apg} onChange={() => handleChange("show_apg")} />} label="Assists Per Game (APG)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_rpg} onChange={() => handleChange("show_rpg")} />} label="Rebounds Per Game (RPG)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_fg2_pct} onChange={() => handleChange("show_fg2_pct")} />} label="Two-point Field Goal Percentage (2P%)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_fg3_pct} onChange={() => handleChange("show_fg3_pct")} />} label="Three-point Field Goal Percentage (3P%)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_fg_pct} onChange={() => handleChange("show_fg_pct")} />} label="Total Field Goal Percentage (FG%)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_ft_pct} onChange={() => handleChange("show_ft_pct")} />} label="Free Throw Percentage (FT%)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_ts_pct} onChange={() => handleChange("show_ts_pct")} />} label="True Shooting Percentage (TS%)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_spg} onChange={() => handleChange("show_spg")} />} label="Steals Per Game (SPG)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_bpg} onChange={() => handleChange("show_bpg")} />} label="Blocks Per Game (BPG)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_tpg} onChange={() => handleChange("show_tpg")} />} label="Turnovers Per Game (TPG)" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_gp} onChange={() => handleChange("show_gp")} />} label="Games Played (GP)" />
                </FormGroup>
                <FormGroup sx={{ alignItems: "center" }}>
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastmpg} onChange={() => handleChange("show_lastmpg")} />} label="Last 10 Games MPG" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastppg} onChange={() => handleChange("show_lastppg")} />} label="Last 10 Games PPG" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastapg} onChange={() => handleChange("show_lastapg")} />} label="Last 10 Games APG" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastrpg} onChange={() => handleChange("show_lastrpg")} />} label="Last 10 Games RPG" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastfg2_pct} onChange={() => handleChange("show_lastfg2_pct")} />} label="Last 10 Games 2P%" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastfg3_pct} onChange={() => handleChange("show_lastfg3_pct")} />} label="Last 10 Games 3P%" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastfg_pct} onChange={() => handleChange("show_lastfg_pct")} />} label="Last 10 Games FG%" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastft_pct} onChange={() => handleChange("show_lastft_pct")} />} label="Last 10 Games FT%" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastspg} onChange={() => handleChange("show_lastspg")} />} label="Last 10 Games SPG" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lastbpg} onChange={() => handleChange("show_lastbpg")} />} label="Last 10 Games BPG" />
                    <FormControlLabel control={<Checkbox checked={state.statsToShow.show_lasttpg} onChange={() => handleChange("show_lasttpg")} />} label="Last 10 Games TPG" />
                </FormGroup>
            </Stack>
        </Stack>
    )
}

export default SelectStats