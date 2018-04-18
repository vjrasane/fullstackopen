import loginService from './login'
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (obj) => {
  const response = await loginService.axiosInstance().post(baseUrl, obj)
  return response.data
}

const update = async (id, obj) => {
  const response = await axios.put(`${baseUrl}/${id}`, obj)
  return response.data
}

const remove = async (id) => {
  const response = await loginService.axiosInstance().delete(`${baseUrl}/${id}`)
  return response
}

const comment = async(id, comment) => {
  const response = await loginService.axiosInstance().post(`${baseUrl}/${id}/comments`, comment)
  return response
}

export default { getAll, create, update, remove, comment }
