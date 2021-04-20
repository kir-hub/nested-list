import axios from 'axios'

export const $host = axios.create({
    baseURL: 'http://localhost:9000/',
    headers: {
        'Content-Type': 'application/json'
    },
    data: 'raw'
})

