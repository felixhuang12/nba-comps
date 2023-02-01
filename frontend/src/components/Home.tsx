import React from 'react'
import { Box } from '@mui/material'

// base url for player images: https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/
// example: https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203999.png -- Nikola Jokic

type HeaderProps = {
    bg: string,
}

const Header = ({ bg }: HeaderProps) => {
    return (
        <Box style={{ backgroundColor: bg, height: "70px" }} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <h1 style={{ fontSize: "24px" }}>NBA Comparisons</h1>
        </Box>
    )
}

const Home = () => {
    return (
        <div>
            <Header bg={"#DCDCDC"} />
        </div>
    )
}

export default Home