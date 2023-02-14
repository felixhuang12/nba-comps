import React from 'react'
import { Box, Stack, Divider } from '@mui/material'
import { Player, Stats, CommonPlayerInfo } from '../types'

const PlayerInfo = ({ commonPlayerInfo }: { commonPlayerInfo: CommonPlayerInfo }) => {
    const playerImageURL = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${commonPlayerInfo.id}.png`
    const teamLogoURL = `http://global.nba.com/media/img/teams/00/logos/${commonPlayerInfo.teamAbbv}_logo.svg`

    return (
        <Box>
            <Stack direction={"row"} minWidth={0}>
                <img className={"player_image"} src={playerImageURL} alt={commonPlayerInfo.name} />
                <img className={"team_image"} src={teamLogoURL} alt={commonPlayerInfo.teamAbbv} style={{ minWidth: 0 }} />
            </Stack>
            <Stack direction={"row"} minWidth={0}>
                <Box sx={{ backgroundColor: "lightgray", p: 2 }}>
                    <h2 style={{ minWidth: 0 }}>{commonPlayerInfo.name}</h2>
                    {commonPlayerInfo.position} / {commonPlayerInfo.teamAbbv}
                </Box>
                <Box display={"flex"} sx={{ backgroundColor: "lightblue" }} alignContent={"center"} justifyContent={"center"} minWidth={0}>
                    <h3 style={{ padding: "0px 16px 0px 16px", margin: "auto" }}>#{commonPlayerInfo.jerseyNum}</h3>
                </Box>
            </Stack>
        </Box>
    )
}

const SeasonStats = ({ stats }: { stats: Stats }) => {
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

const PlayerCard = ({ commonPlayerInfo, seasonStatistics, last10Statistics }: Player) => {
    return (
        <Box minWidth={0}>
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