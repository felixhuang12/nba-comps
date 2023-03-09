import axios from 'axios'
import { LoggedInUser } from '../types'

const baseUrl = '/api/users'

let token: string | null

const setToken = (tokenToSet: string) => {
    token = `bearer ${tokenToSet}`
}

const getPlayers = async (user: LoggedInUser) => {
    const response = await axios.get(`${baseUrl}/${user.username}`)
    return response.data
}

const addPlayer = async (player_name: string) => {
    const config = {
        headers: { Authorization: token },
    }
    console.log(token)

    const response = await axios.post(`${baseUrl}/addplayer`, { "player_name": player_name }, config)
    return response.data
}

const deletePlayer = async (player_id: number) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/deleteplayer/${player_id}`, config)
    return response.data
}

export default { setToken, getPlayers, addPlayer, deletePlayer }