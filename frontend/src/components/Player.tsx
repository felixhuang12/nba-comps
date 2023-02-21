import React from 'react'
import { Box, Stack, Divider } from '@mui/material'
import { Player, Stats, CommonPlayerInfo, HighStats } from '../types'
import DeletePlayerButton from './DeletePlayer'

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

const SeasonStats = ({ stats, highs }: { stats: Stats, highs: HighStats }) => {
    return (
        <Box className={"stats-box"}>
            <Stack spacing={2}>
                <Box sx={{ backgroundColor: stats.ppg === highs.ppg ? "lightgreen" : "" }}>{stats.ppg}</Box>
                <Box sx={{ backgroundColor: stats.apg === highs.apg ? "lightgreen" : "" }}>{stats.apg}</Box>
                <Box sx={{ backgroundColor: stats.rpg === highs.rpg ? "lightgreen" : "" }}>{stats.rpg}</Box>
                <Box sx={{ backgroundColor: stats.fg3_pct === highs.fg3_pct ? "lightgreen" : "" }}>{stats.fg3_pct}%</Box>
                <Box sx={{ backgroundColor: stats.ft_pct === highs.ft_pct ? "lightgreen" : "" }}>{stats.ft_pct}%</Box>
            </Stack>
        </Box>
    )
}

const LastTenGameStats = ({ last10Stats, highs }: { last10Stats: Stats, highs: HighStats }) => {
    return (
        <Box className={"stats-box"}>
            <Stack spacing={2}>
                <Box sx={{ backgroundColor: last10Stats.ppg === highs.lastppg ? "lightgreen" : "" }}>{last10Stats.ppg}</Box>
                <Box sx={{ backgroundColor: last10Stats.apg === highs.lastapg ? "lightgreen" : "" }}>{last10Stats.apg}</Box>
                <Box sx={{ backgroundColor: last10Stats.rpg === highs.lastrpg ? "lightgreen" : "" }}>{last10Stats.rpg}</Box>
            </Stack>
        </Box>
    )
}

const ShootingPerformance = ({ seasonStatistics, highs }: { seasonStatistics: Stats, highs: HighStats }) => {
    return (
        <Box className={"stats-box"}>
            <Stack spacing={2}>
                <Box sx={{ backgroundColor: seasonStatistics.fg2_pct === highs.fg2_pct ? "lightgreen" : "" }}>{seasonStatistics.fg2_pct}%</Box>
                <Box sx={{ backgroundColor: seasonStatistics.fg3_pct === highs.fg3_pct ? "lightgreen" : "" }}>{seasonStatistics.fg3_pct}%</Box>
                <Box sx={{ backgroundColor: seasonStatistics.fg_pct === highs.fg_pct ? "lightgreen" : "" }}>{seasonStatistics.fg_pct}%</Box>
                <Box sx={{ backgroundColor: seasonStatistics.ts_pct === highs.ts_pct ? "lightgreen" : "" }}>{seasonStatistics.ts_pct}%</Box>
            </Stack>
        </Box>
    )
}

const PlayerCard = ({ player, highs }: { player: Player, highs: HighStats }) => {
    return (
        <Box minWidth={0}>
            <DeletePlayerButton player={player} />
            <PlayerInfo commonPlayerInfo={player.commonPlayerInfo} />
            <Divider sx={{ borderWidth: 1, marginTop: 2 }} />
            <SeasonStats stats={player.seasonStatistics} highs={highs} />
            <Divider sx={{ borderWidth: 1, marginTop: 2 }} />
            <LastTenGameStats last10Stats={player.last10Statistics} highs={highs} />
            <Divider sx={{ borderWidth: 1, marginTop: 2 }} />
            <ShootingPerformance seasonStatistics={player.seasonStatistics} highs={highs} />
        </Box>
    )
}

export default PlayerCard