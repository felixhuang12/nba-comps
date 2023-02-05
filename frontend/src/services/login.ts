import axios from 'axios'
import { NewUser } from '../types'
const baseUrl = '/api/login'

type LoginProps = {
    username: string,
    password: string
}

const login = async (credentials: LoginProps) => {
    const response = await axios.post(`${baseUrl}/auth`, credentials)
    console.log(response.data)
    return response.data
}

const createUser = async (newUser: NewUser) => {
    const response = await axios.post(`${baseUrl}/create`, newUser)
    return response.data
}

export default { login, createUser }