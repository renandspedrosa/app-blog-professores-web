import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findUserByEmail, updateUser } from '@/services/user'
import errorsMessage from '@/utils/messageError'
import { decode } from 'jwt-js-decode'
import { toast } from 'react-toastify'

const useUpdateAccountForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formUser, setFormUser] = useState({
    typeUser: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const token = localStorage.getItem('authToken')
  const jwt = decode(token)
  const userType = jwt.payload?.type

  const fetchUserByEmail = async (email) => {
    try {
      setLoading(true)
      const user = await findUserByEmail(email)

      console.log(user)
      //console.log(user.teachers)

      setFormUser({
        typeUser: userType,
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
      })
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

      //Pegar usuário pelo estudante
      //Pegar usuário pelo professor
      //verificar o tipo e passar para o formUser o userType
    }
  }, [])

  const handleUpdateUser = async () => {
    try {
      setLoading(true)
      await updateUser(formUser)
      toast.success('User updated successfully')
      navigate('/profile')
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
