import axios from 'axios';
const baseUrl = '/api/author';

const getAllAuthors = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAuthor = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  console.log('response', response.data)
  return response.data;
};

const updateAuthor = async (id, updatedAuthor) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAuthor);
  console.log('response', response.data)
  return response.data;
};

const deleteAuthor = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAllAuthors, createAuthor, updateAuthor, deleteAuthor };
