import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from '@/pages/PostList';
import Login from '@/pages/Login';
import CreateAccount from '@/pages/CreateAccount';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { NavigationProvider } from '@/context/NavigationContext';
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from 'react-alert';

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  containerStyle: {
    marginTop: '4rem'
  }
};

const App = () => {
  return (
    <Provider 
      template={AlertTemplate} 
      {...options}
    >
      <Router>
        <NavigationProvider>
          <AuthProvider>
            <Navbar>
              <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
              </Routes>
            </Navbar>
          </AuthProvider>
        </NavigationProvider>
      </Router>
    </Provider>
  );
};


export default App;
