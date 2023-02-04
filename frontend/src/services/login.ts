import axios from 'axios'
import { NewUser } from '../types'
const baseUrl = '/api/login'

const createUser = async (newUser: NewUser) => {
    const response = await axios.post(`${baseUrl}/create`, newUser)
    return response.data
}

const test = async () => {
    const res = await axios.get('/api/index')
    return res.data
}

export default { createUser, test }