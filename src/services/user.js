import api from '@/config/axios'

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
    const token = localStorage.getItem('authToken')

    const response = await api.put(`/user/${id}`, param, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error(
      'Erro ao atualizar usuário:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}
