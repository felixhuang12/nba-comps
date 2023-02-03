import React from 'react'
import { useState } from 'react'
import { Box, Stack } from '@mui/material'

// ts% = pts/(2 * (fga + (0.44 * fta)))

interface Stats {
    gp: number,
    pts: number,
    ast: number,
    reb: number,
    fg3_pct: number,
    ft_pct: number,
    fta: number, // for TS% calc
    fga: number, // for TS% calc
    fgm: number,
    fg3a: number,
    fg3m: number,
    fg_pct: number
}


interface Player {
    id: number,
    seasonStatistics: Stats,
    last10Statistics: Stats
}

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

const SeasonStats = () => {

}

const LastTenGameStats = () => {

}

const ShootingPerformance = () => {

}

const Player = ({ id, seasonStatistics, last10Statistics }: Player) => {
    const [playerId, setPlayerId] = useState(id)
    const [seasonStats, setSeasonStats] = useState(seasonStatistics)
    const [last10Stats, setLast10Stats] = useState(last10Statistics)

    // call to backend to retrieve season and last 10 stat info using playerid using the playercareerstats and playerdashboardbylastngames apis

    return (
        <Box>
            <PlayerInfo playerId={playerId} />
            {/* {seasonStats.pts}
            {last10Stats.pts} */}
        </Box>
    )
}

export default Player