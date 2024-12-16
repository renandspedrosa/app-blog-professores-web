import api from '@/config/axios'

export const createStudent = async (param) => {
  try {
    const response = await api.post(`/student`, param, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error(
      'Erro ao criar estudante:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}

export const updateStudent = async (id, param) => {
  try {
    const response = await api.put(`/student/${id}`, param, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error(
      'Erro ao atualizar estudante:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}