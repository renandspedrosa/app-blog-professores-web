import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateTeacher } from '@/services/teacher'
import { updateStudent } from '@/services/student'
import errorsMessage from '@/utils/messageError'
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setFormUser({
      typeUser: user?.type === 'teacher' ? '1' : '2', // Ajuste para lidar com a ausência do campo 'type'
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    })
  }, [])

  console.log('hook: ' + formUser.typeUser)

  const handleChange = (field, value) => {
    setFormUser((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleUpdateUser = async (values) => {
    try {
      setLoading(true)
      if (values.typeUser === '1') {
        await updateTeacher(values)
      } else if (values.typeUser === '2') {
        await updateStudent(values)
      }
      setLoading(false)
      navigate('/profile', { replace: true })
      toast.success('Usuário atualizado com sucesso!')
    } catch (error) {
      setLoading(false)
      errorsMessage(error, toast)
    }
  }

  return {
    loading,
    formUser,
    handleChange,
    handleUpdateUser,
  }
}

export default useUpdateAccountForm
