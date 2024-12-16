import api from '@/config/axios'
import axiosInstance from '../config/axiosInstance'

export const findUserByEmail = async (email) => {
  try {
    const response = await api.get(`/user/email/${email}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error(
      'Erro ao encontrar o usuário:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}

export const updateUser = async (id, param) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, param)

    return response.data
  } catch (error) {
    console.error(
      'Erro ao atualizar usuário:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}
