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
    password: '',
    confirmPassword: '',
  })

  const fetchUserByEmail = async (email) => {
    try {
      setLoading(true)
      const user = await findUserByEmail(email)

      setUserId(user.id)

      setFormUser(() => ({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
      }))
    } catch (error) {
      toast.error(errorsMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const updateFormUser = (field, value) => {
    setFormUser((prevFormUser) => ({
      ...prevFormUser,
      [field]: value,
    }))
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.email) {
      fetchUserByEmail(user.email)
    }
  }, [])

  const handleUpdateUser = async (values) => {
    try {
      setLoading(true)

      if (values.password === '') {
        delete values.password
        delete values.confirmPassword
      }

      await updateUser(userId, values)

      localStorage.setItem('user', JSON.stringify(values))

      toast.success('Usuário atualizado com sucesso')
      navigate('/')
    } catch (error) {
      toast.error(errorsMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    formUser,
    handleUpdateUser,
    updateFormUser,
  }
}

export default useUpdateAccountForm
