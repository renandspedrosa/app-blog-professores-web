import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PostList from '@/pages/PostList'
import Login from '@/pages/Login'
import CreateAccount from '@/pages/CreateAccount'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/context/AuthContext'
import { NavigationProvider } from '@/context/NavigationContext'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PostDetails from './pages/PostDetails'

const App = () => {
  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <Router>
        <NavigationProvider>
          <AuthProvider>
            <Navbar>
              <Routes>
                <Route path='/' element={<PostList />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create-account' element={<CreateAccount />} />
                <Route path='/posts/:id' element={<PostDetails />} />
              </Routes>
            </Navbar>
          </AuthProvider>
        </NavigationProvider>
      </Router>
    </>
  )
}

export default App
