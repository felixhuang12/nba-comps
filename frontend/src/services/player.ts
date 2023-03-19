import axios from 'axios'

const baseUrl = '/api/nba_api'

const getAllActiveNBAPlayers = async () => {
    const response = await axios.get(`${baseUrl}/active_players`)
    return response.data
}

export default { getAllActiveNBAPlayers }