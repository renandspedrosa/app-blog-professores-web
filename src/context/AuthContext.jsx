import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigation } from '@/context/NavigationContext'
import { decode } from 'jwt-js-decode'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const { availableNavigation } = useNavigation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [loggedInUserId, setLoggedInUserId] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleUserType = useCallback((token) => {
    try {
      const jwt = decode(token)
      const userType = jwt.payload?.type
      setIsTeacher(userType === 'teacher')
      setIsStudent(userType === 'student')
    } catch (error) {
      console.error('Erro ao decodificar o token:', error)
    }
  }, [])

  const loggedUserId = (token) => {
    try {
      const jwt = decode(token)
      setLoggedInUserId(jwt.payload?.id)
      return jwt.payload?.id || null
    } catch (error) {
      console.error('Erro ao extrair userId do token:', error)
      return null
    }
  }

  const login = (token, userData) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
    handleUserType(token)
  }

  const logout = useCallback(() => {
    localStorage.setItem('authToken', null)
    localStorage.setItem('user', null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.clear()
    setIsAuthenticated(false)
    setUser(null)
    setIsTeacher(false)
    setIsStudent(false)
    setTimeout(() => {
      navigate('/')
    }, 0)
  }, [navigate])

  const isTokenExpired = useCallback((token) => {
    try {
      const decoded = decode(token)
      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.payload?.exp < currentTime
    } catch (error) {
      console.error('Erro ao verificar validade do token:', error)
      return true
    }
  }, [])

  const handleTokenExpiration = useCallback(() => {
    const token = localStorage.getItem('authToken')
    if (token && isTokenExpired(token)) {
      logout()
      toast.info('Sua sessão expirou, faça login novamente.')
    }
  }, [isTokenExpired, logout])

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('user')
    if (token && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
      handleUserType(token)
      loggedUserId(token)

      if (isTokenExpired(token)) {
        logout()
      }
    }
  }, [handleUserType, isTokenExpired, logout])

  useEffect(() => {
    if (!isAuthenticated && !availableNavigation) {
      navigate('/')
    }
  }, [isAuthenticated, navigate, availableNavigation])

  const value = {
    isAuthenticated,
    isTeacher,
    isStudent,
    loggedInUserId,
    user,
    login,
    logout,
    handleTokenExpiration,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const AuthConsumer = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {(context) => children(context)}
    </AuthContext.Consumer>
  )
}
