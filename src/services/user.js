import api from '@/config/axios'

export const findUserByEmail = async (email) => {
  try {
    const response = await api.get(`/user/${email}`, {
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
