import axios from 'axios'
const baseUrl = '/api/login'

let instance
const axiosInstance = () => instance

const setToken = (token) => {
  const authToken = `Bearer ${token}`
  const authHeaders = { 'Authorization' : authToken }
  instance = axios.create({
    headers: {
      common: authHeaders
    }
  })
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login, axiosInstance, setToken }
