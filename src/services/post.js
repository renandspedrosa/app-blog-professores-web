import api from '@/config/axios';
import axios from 'axios';

const host = import.meta.env.API_HOST || 'http://localhost:3000';
const token = localStorage.getItem('authToken');

export const getPosts = async (page = 1, limit = 5, search = '') => {
  try {
    const response = await api.get(`/posts`, {
      params: {
        page,
        limit,
        term: search,
      },
    })
    return { data: response.data }
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw error
  }
}

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${host}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter o post com id ${id}:`, error)
    throw error
  }
}

export const createPost = async (postData) => {
  try {
    // Verifica se o token existe
    if (!token) {
      throw new Error(
        'Token de autenticação não encontrado. Usuário não está logado.',
      )
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let payload = postData;

    if (!(postData instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
      payload = {
        title: postData.title,
        content: postData.content,
      };
    }

    const response = await axios.post(`${host}/posts`, payload, { headers });

    return response.data
  } catch (error) {
    console.error(
      'Erro ao criar post:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}

//TODO: Desenvolver método postviewed para quando clicar e navegar marcar como visto

export const postViewed = async (id) => {
  try {
    await api.put(`/posts/${id}/viewed`)
  } catch (error) {
    console.error(`Erro ao marcar post com id ${id} como visualizado:`, error)
    throw error
  }
}


export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${host}/posts/${id}`, postData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Erro ao atualizar post com id ${id}:`, error)
    throw error
  }
}

export const deletePost = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.delete(`${host}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(`Erro ao excluir post com id ${id}:`, error)
    throw error
  }
}
