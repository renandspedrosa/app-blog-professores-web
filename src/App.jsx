import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </Navbar>
      </Router>
    </AuthProvider>
  );
};
export default App;
