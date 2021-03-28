import axios from 'axios'

const axiosBackend = axios.create({
    baseURL: '/api',
    timeout: 100000,
})

export default axiosBackend
