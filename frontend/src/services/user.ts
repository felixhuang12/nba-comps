import axios from 'axios'

let token = null

const setToken = (tokenToSet: string) => {
    token = `bearer ${tokenToSet}`
}

export default { setToken }