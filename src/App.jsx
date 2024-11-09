import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from '@/pages/PostList';
import Login from '@/pages/Login';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { NavigationProvider } from '@/context/NavigationContext';

const App = () => {
  return (
    <Router>
      <NavigationProvider>
        <AuthProvider>
          <Navbar>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Navbar>
        </AuthProvider>
      </NavigationProvider>
    </Router>
  );
};


export default App;
