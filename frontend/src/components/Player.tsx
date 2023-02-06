import React from 'react'
import { useState } from 'react'
import { Box, Stack, Divider } from '@mui/material'
import { Player, Stats, CommonPlayerInfo } from '../types'

// ts% = pts/(2 * (fga + (0.44 * fta)))

const PlayerInfo = ({ commonPlayerInfo }: { commonPlayerInfo: CommonPlayerInfo }) => {
    // const [name, setName] = useState(playerInfo.name)
    // const [position, setPosition] = useState(playerInfo.position)
    // const [teamAbbv, setTeamAbbv] = useState(playerInfo.teamAbbv)
    // const [jerseyNum, setJerseyNum] = useState(playerInfo.jerseyNum)

    const playerImageURL = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${commonPlayerInfo.id}.png`
    const teamLogoURL = `http://global.nba.com/media/img/teams/00/logos/${commonPlayerInfo.teamAbbv}_logo.svg`

    return (
        <Box>
            <Stack direction={"row"}>
                <img className={"player_image"} src={playerImageURL} alt={"Player image"} />
                <img className={"team_image"} src={teamLogoURL} alt="Team log" />
            </Stack>
            <Stack direction={"row"}>
                <Box sx={{ backgroundColor: "lightgray", p: 2 }}>
                    <h2>{commonPlayerInfo.name}</h2>
                    {commonPlayerInfo.position} / {commonPlayerInfo.teamAbbv}
                </Box>
                <Box display={"flex"} sx={{ backgroundColor: "lightblue" }} alignContent={"center"} justifyContent={"center"}>
                    <h3 style={{ padding: "0px 16px 0px 16px", margin: "auto" }}>#{commonPlayerInfo.jerseyNum}</h3>
                </Box>
            </Stack>
        </Box>

    )
}

// main component to bundle every stats component together -- but probably not necessary
// const PlayerStats = () => {

// }

const SeasonStats = ({ stats }: { stats: Stats }) => {
    // const [PPG, setPPG] = useState(Math.round(stats.pts / stats.gp * 10) / 10)
    // const [APG, setAPG] = useState(Math.round(stats.ast / stats.gp * 10) / 10)
    // const [RPG, setRPG] = useState(Math.round(stats.reb / stats.gp * 10) / 10)
    // const [FG3_PCT, setFG3_PCT] = useState(stats.fg3_pct)
    // const [FT_PCT, setFT_PCT] = useState(stats.ft_pct)

    return (
        <Box sx={{ p: 2, marginTop: 2 }} display={"flex"} alignContent={"center"} justifyContent={"center"}>
            <Stack spacing={2}>
                <Box>{stats.ppg}</Box>
                <Box>{stats.apg}</Box>
                <Box>{stats.rpg}</Box>
                <Box>{stats.fg3_pct}%</Box>
                <Box>{stats.ft_pct}%</Box>
            </Stack>
        </Box>
    )
}

const LastTenGameStats = ({ last10Stats }: { last10Stats: Stats }) => {
    // const [PPG, setPPG] = useState(Math.round(last10Stats.pts / last10Stats.gp * 10) / 10)
    // const [APG, setAPG] = useState(Math.round(last10Stats.ast / last10Stats.gp * 10) / 10)
    // const [RPG, setRPG] = useState(Math.round(last10Stats.reb / last10Stats.gp * 10) / 10)

    return (
        <Box sx={{ p: 2, marginTop: 2 }} display={"flex"} alignContent={"center"} justifyContent={"center"}>
            <Stack spacing={2}>
                <Box>{last10Stats.ppg}</Box>
                <Box>{last10Stats.apg}</Box>
                <Box>{last10Stats.rpg}</Box>
            </Stack>
        </Box>
    )
}

const ShootingPerformance = ({ seasonStatistics }: { seasonStatistics: Stats }) => {
    // const [PT2_PCT, setPT2_PCT] = useState()
    // const [FG3_PCT, setFG3_PCT] = useState(seasonStatistics.fg3_pct)
    // const [FG_PCT, setFG_PCT] = useState(seasonStatistics.fg_pct)
    // const [TS_PCT, setTS_PCT] = useState(Math.round(seasonStatistics.pts * 1000 / (2 * (seasonStatistics.fga + (0.44 * seasonStatistics.fta)))) / 1000)

    return (
        <Box sx={{ p: 2, marginTop: 2 }} display={"flex"} alignContent={"center"} justifyContent={"center"}>
            <Stack spacing={2}>
                <Box>{seasonStatistics.fg2_pct}%</Box>
                <Box>{seasonStatistics.fg3_pct}%</Box>
                <Box>{seasonStatistics.fg_pct}%</Box>
                <Box>{seasonStatistics.ts_pct}%</Box>
            </Stack>
        </Box>
    )
}

const PlayerCard = ({ id, commonPlayerInfo, seasonStatistics, last10Statistics }: Player) => {

    return (
        <Box>
            <PlayerInfo commonPlayerInfo={commonPlayerInfo} />
            <Divider sx={{ borderWidth: 1, marginTop: 2 }} />
            <SeasonStats stats={seasonStatistics} />
            <Divider sx={{ borderWidth: 1, marginTop: 2 }} />
            <LastTenGameStats last10Stats={last10Statistics} />
            <Divider sx={{ borderWidth: 1, marginTop: 2 }} />
            <ShootingPerformance seasonStatistics={seasonStatistics} />
        </Box>
    )
}

export default PlayerCard