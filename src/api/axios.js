import axios from "axios"
import { useCookies } from "vue3-cookies"

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.request.use(
    async config => {
        const {cookies} = useCookies()
        if (cookies.isKey('token')) {
            config.headers.Authorization = `Bearer ${cookies.get('token').value}`
        }
        return config
    },
    error => {
        console.log(error)
    }
)

axios.interceptors.response.use(
    response => response,
    async error => {
        const {cookies} = useCookies()
        console.log(location.pathname)
        if (error.response.status == 401 && location.pathname !== '/login') {
            location.href = '/login'
            console.log('unauth')
        }
        return Promise.reject(error)
    }   
)