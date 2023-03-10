import React from 'react'
import { Box, Stack, Divider } from '@mui/material'
import { Player, Stats, CommonPlayerInfo, HighStats } from '../types'
import DeletePlayerButton from './DeletePlayer'
import { useStateValue } from '../state/state'

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
    const [state, ] = useStateValue()

    return (
        <Box className={"stats-box"}>
            <Stack spacing={2}>
                <Box display={state.statsToShow.show_gp ? "" : 'none'} sx={{ backgroundColor: stats.gp === highs.gp ? "lightgreen" : "" }}>{stats.gp}</Box>
                <Box display={state.statsToShow.show_mpg ? "" : 'none'} sx={{ backgroundColor: stats.mpg === highs.mpg ? "lightgreen" : "" }}>{stats.mpg}</Box>
                <Box display={state.statsToShow.show_ppg ? "" : 'none'} sx={{ backgroundColor: stats.ppg === highs.ppg ? "lightgreen" : "" }}>{stats.ppg}</Box>
                <Box display={state.statsToShow.show_apg ? "" : 'none'} sx={{ backgroundColor: stats.apg === highs.apg ? "lightgreen" : "" }}>{stats.apg}</Box>
                <Box display={state.statsToShow.show_rpg ? "" : 'none'} sx={{ backgroundColor: stats.rpg === highs.rpg ? "lightgreen" : "" }}>{stats.rpg}</Box>
                <Box display={state.statsToShow.show_fg3_pct ? "" : 'none'} sx={{ backgroundColor: stats.fg3_pct === highs.fg3_pct ? "lightgreen" : "" }}>{stats.fg3_pct}%</Box>
                <Box display={state.statsToShow.show_ft_pct ? "" : 'none'} sx={{ backgroundColor: stats.ft_pct === highs.ft_pct ? "lightgreen" : "" }}>{stats.ft_pct}%</Box>
                <Box display={state.statsToShow.show_spg ? "" : 'none'} sx={{ backgroundColor: stats.spg === highs.spg ? "lightgreen" : "" }}>{stats.spg}</Box>
                <Box display={state.statsToShow.show_bpg ? "" : 'none'} sx={{ backgroundColor: stats.bpg === highs.bpg ? "lightgreen" : "" }}>{stats.bpg}</Box>
                <Box display={state.statsToShow.show_tpg ? "" : 'none'} sx={{ backgroundColor: stats.tpg === highs.tpg ? "lightgreen" : "" }}>{stats.tpg}</Box>
            </Stack>
        </Box>
    )
}

const LastTenGameStats = ({ last10Stats, highs }: { last10Stats: Stats, highs: HighStats }) => {
    const [state, ] = useStateValue()

    return (
        <Box className={"stats-box"}>
            <Stack spacing={2}>
                <Box display={state.statsToShow.show_lastmpg ? "" : 'none'} sx={{ backgroundColor: last10Stats.mpg === highs.lastmpg ? "lightgreen" : "" }}>{last10Stats.mpg}</Box>
                <Box display={state.statsToShow.show_lastppg ? "" : 'none'} sx={{ backgroundColor: last10Stats.ppg === highs.lastppg ? "lightgreen" : "" }}>{last10Stats.ppg}</Box>
                <Box display={state.statsToShow.show_lastapg ? "" : 'none'} sx={{ backgroundColor: last10Stats.apg === highs.lastapg ? "lightgreen" : "" }}>{last10Stats.apg}</Box>
                <Box display={state.statsToShow.show_lastrpg ? "" : 'none'} sx={{ backgroundColor: last10Stats.rpg === highs.lastrpg ? "lightgreen" : "" }}>{last10Stats.rpg}</Box>
                <Box display={state.statsToShow.show_lastfg3_pct ? "" : 'none'} sx={{ backgroundColor: last10Stats.fg3_pct === highs.lastfg3_pct ? "lightgreen" : "" }}>{last10Stats.fg3_pct}%</Box>
                <Box display={state.statsToShow.show_lastft_pct ? "" : 'none'} sx={{ backgroundColor: last10Stats.ft_pct === highs.lastft_pct ? "lightgreen" : "" }}>{last10Stats.ft_pct}%</Box>
                <Box display={state.statsToShow.show_lastspg ? "" : 'none'} sx={{ backgroundColor: last10Stats.spg === highs.lastspg ? "lightgreen" : "" }}>{last10Stats.spg}</Box>
                <Box display={state.statsToShow.show_lastbpg ? "" : 'none'} sx={{ backgroundColor: last10Stats.bpg === highs.lastbpg ? "lightgreen" : "" }}>{last10Stats.bpg}</Box>
                <Box display={state.statsToShow.show_lasttpg ? "" : 'none'} sx={{ backgroundColor: last10Stats.tpg === highs.lasttpg ? "lightgreen" : "" }}>{last10Stats.tpg}</Box>
            </Stack>
        </Box>
    )
}

const ShootingPerformance = ({ seasonStatistics, highs }: { seasonStatistics: Stats, highs: HighStats }) => {
    const [state, ] = useStateValue()

    return (
        <Box className={"stats-box"}>
            <Stack spacing={2}>
                <Box display={state.statsToShow.show_fg2_pct ? "" : 'none'} sx={{ backgroundColor: seasonStatistics.fg2_pct === highs.fg2_pct ? "lightgreen" : "" }}>{seasonStatistics.fg2_pct}%</Box>
                <Box display={state.statsToShow.show_fg3_pct ? "" : 'none'} sx={{ backgroundColor: seasonStatistics.fg3_pct === highs.fg3_pct ? "lightgreen" : "" }}>{seasonStatistics.fg3_pct}%</Box>
                <Box display={state.statsToShow.show_fg_pct ? "" : 'none'} sx={{ backgroundColor: seasonStatistics.fg_pct === highs.fg_pct ? "lightgreen" : "" }}>{seasonStatistics.fg_pct}%</Box>
                <Box display={state.statsToShow.show_ts_pct ? "" : 'none'} sx={{ backgroundColor: seasonStatistics.ts_pct === highs.ts_pct ? "lightgreen" : "" }}>{seasonStatistics.ts_pct}%</Box>
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