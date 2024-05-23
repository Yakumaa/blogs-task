import axios from 'axios'
const baseUrl = '/api/blog'

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const updateBlog = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const getBlogDetails = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const likeBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/likes/${id}`);
  return response.data;
}

const dislikeBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/likes/${id}`);
  return response.data;
}

export default { 
  getAllBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog,
  getBlogDetails,
  likeBlog,
  dislikeBlog
}