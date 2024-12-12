import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findUserByEmail, updateUser } from '@/services/user'
import errorsMessage from '@/utils/messageError'
import { toast } from 'react-toastify'

const useUpdateAccountForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [formUser, setFormUser] = useState({
    name: '',
    email: '',
  })

  const fetchUserByEmail = async (email) => {
    try {
      setLoading(true)
      const user = await findUserByEmail(email)

      console.log(user.id)

      setUserId(user.id)

      setFormUser(() => ({
        name: user.name || '',
        email: user.email || '',
      }))
    } catch (error) {
      toast.error(errorsMessage(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.email) {
      fetchUserByEmail(user.email)
    }
  }, [])

  const handleUpdateUser = async (values) => {
    try {
      const { name, email } = values

      setLoading(true)

      console.log(values)

      await updateUser(userId, { name, email })

      localStorage.setItem('user', JSON.stringify({ name, email }))

      toast.success('Usuário atualizado com sucesso')
      navigate('/')
    } catch (error) {
      toast.error(errorsMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return {
    formUser,
    setFormUser,
    loading,
    handleUpdateUser,
  }
}

export default useUpdateAccountForm
