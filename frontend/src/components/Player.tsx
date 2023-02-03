import React from 'react'
import { useState } from 'react'
import { Box, Stack, Divider } from '@mui/material'
import { Player, Stats } from '../types'

// ts% = pts/(2 * (fga + (0.44 * fta)))

const PlayerInfo = ({ playerId }: { playerId: number }) => {
    const [name, setName] = useState("Jayson Tatum") // display_first_last
    const [position, setPosition] = useState("Forward-Guard") // position
    const [teamAbbv, setTeamAbbv] = useState("BOS") // team_abbreviation
    const [jerseyNum, setJerseyNum] = useState("0") // jersey

    const playerImageURL = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`
    const teamLogoURL = `http://global.nba.com/media/img/teams/00/logos/${teamAbbv}_logo.svg`

    // call to backend to retrieve state vars info using playerid using the commonplayerinfo api

    return (
        <Box>
            <Stack direction={"row"}>
                <img className={"player_image"} src={playerImageURL} alt={"Player image"} />
                <img className={"team_image"} src={teamLogoURL} alt="Team log" />
            </Stack>
            <Stack direction={"row"}>
                <Box sx={{ backgroundColor: "lightgray", p: 2 }}>
                    <h2>{name}</h2>
                    {position} / {teamAbbv}
                </Box>
                <Box display={"flex"} sx={{ backgroundColor: "lightblue" }} alignContent={"center"} justifyContent={"center"}>
                    <h3 style={{ padding: "0px 16px 0px 16px", margin: "auto" }}>#{jerseyNum}</h3>
                </Box>
            </Stack>
        </Box>

    )
}

// main component to bundle every stats component together -- but probably not necessary
// const PlayerStats = () => {

// }

const SeasonStats = ({ seasonStatistics }: { seasonStatistics: Stats }) => {
    const [PPG, setPPG] = useState(Math.round(seasonStatistics.pts / seasonStatistics.gp * 10) / 10)
    const [APG, setAPG] = useState(Math.round(seasonStatistics.ast / seasonStatistics.gp * 10) / 10)
    const [RPG, setRPG] = useState(Math.round(seasonStatistics.reb / seasonStatistics.gp * 10) / 10)
    const [FG3_PCT, setFG3_PCT] = useState(seasonStatistics.fg3_pct)
    const [FT_PCT, setFT_PCT] = useState(seasonStatistics.ft_pct)

    return (
        <Box sx={{ p: 2, marginTop: 2 }} display={"flex"} alignContent={"center"} justifyContent={"center"}>
            <Stack spacing={2}>
                <Box>{PPG}</Box>
                <Box>{APG}</Box>
                <Box>{RPG}</Box>
                <Box>{FG3_PCT}%</Box>
                <Box>{FT_PCT}%</Box>
            </Stack>
        </Box>
    )
}

const LastTenGameStats = ({ last10Stats }: { last10Stats: Stats }) => {
    const [PPG, setPPG] = useState(Math.round(last10Stats.pts / last10Stats.gp * 10) / 10)
    const [APG, setAPG] = useState(Math.round(last10Stats.ast / last10Stats.gp * 10) / 10)
    const [RPG, setRPG] = useState(Math.round(last10Stats.reb / last10Stats.gp * 10) / 10)

    return (
        <Box sx={{ p: 2, marginTop: 2 }} display={"flex"} alignContent={"center"} justifyContent={"center"}>
            <Stack spacing={2}>
                <Box>{PPG}</Box>
                <Box>{APG}</Box>
                <Box>{RPG}</Box>
            </Stack>
        </Box>
    )
}

const ShootingPerformance = ({ seasonStatistics }: { seasonStatistics: Stats }) => {
    const [PT2_PCT, setPT2_PCT] = useState(Math.round((seasonStatistics.fgm - seasonStatistics.fg3m) * 1000 / (seasonStatistics.fga - seasonStatistics.fg3a)) / 1000)
    const [FG3_PCT, setFG3_PCT] = useState(seasonStatistics.fg3_pct)
    const [FG_PCT, setFG_PCT] = useState(seasonStatistics.fg_pct)
    const [TS_PCT, setTS_PCT] = useState(Math.round(seasonStatistics.pts * 1000 / (2 * (seasonStatistics.fga + (0.44 * seasonStatistics.fta)))) / 1000)

    return (
        <Box sx={{ p: 2, marginTop: 2 }} display={"flex"} alignContent={"center"} justifyContent={"center"}>
            <Stack spacing={2}>
                <Box>{PT2_PCT}%</Box>
                <Box>{FG3_PCT}%</Box>
                <Box>{FG_PCT}%</Box>
                <Box>{TS_PCT}%</Box>
            </Stack>
        </Box>
    )
}

const PlayerCard = ({ id, seasonStatistics, last10Statistics }: Player) => {
    const [playerId, setPlayerId] = useState(id)
    const [seasonStats, setSeasonStats] = useState(seasonStatistics)
    const [last10Stats, setLast10Stats] = useState(last10Statistics)

    // call to backend to retrieve season and last 10 stat info using playerid using the playercareerstats and playerdashboardbylastngames apis

    return (
        <Box>
            <PlayerInfo playerId={playerId} />
            <Divider sx={{ borderWidth: 1, marginTop: 2 }} />
            <SeasonStats seasonStatistics={seasonStats} />
            <Divider sx={{ borderWidth: 1, marginTop: 2 }} />
            <LastTenGameStats last10Stats={last10Stats} />
            <Divider sx={{ borderWidth: 1, marginTop: 2 }} />
            <ShootingPerformance seasonStatistics={seasonStats} />
        </Box>
    )
}

export default PlayerCard