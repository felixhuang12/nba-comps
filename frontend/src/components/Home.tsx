import React from 'react'
import { Box } from '@mui/material'

type HeaderProps = {
    bg: string,
}

const Header = ({ bg }: HeaderProps) => {
    return (
        <Box style={{ backgroundColor: bg, height: "70px" }} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <h1 style={{fontSize: "24px"}}>NBA Comparisons</h1>
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