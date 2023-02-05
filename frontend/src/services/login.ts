import axios from 'axios'
import { NewUser } from '../types'
const baseUrl = '/api/login'

type Credentials = {
    username: string,
    password: string
}

const createUser = async (newUser: NewUser) => {
    console.log(newUser)
    const response = await axios.post(`${baseUrl}/create`, newUser)
    return response.data
}

const login = async (credentials: Credentials) => {
    const response = await axios.post(`${baseUrl}/auth`, credentials)
    console.log(response.data)
    return response.data
}

export default { login, createUser }