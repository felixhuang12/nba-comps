import axios from 'axios'
import { LoggedInUser } from '../types'

const baseUrl = '/api/users'

let token = null

const setToken = (tokenToSet: string) => {
    token = `bearer ${tokenToSet}`
}

const getPlayers = async (user: LoggedInUser) => {
    const response = await axios.get(`${baseUrl}/${user.username}`)
    return response.data
}

export default { setToken, getPlayers }