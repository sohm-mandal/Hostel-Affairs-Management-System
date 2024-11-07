import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importing components
import Login from './Components/LoginPage';
import Home from './Components/Home';
import ProtectedRoutes from './Components/ProtectedRoutes';
import { ReactComponent as LoadingIcon } from './images/Eclipse@2x-1.0s-200px-200px.svg';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      axios
        .get('http://localhost:5000/api/auth/verify-token', {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('authToken', token); // Save token to localStorage
      toast.success('Logged in successfully!');

      // Navigate to the home page using window.location.href
      window.location.href = '/home';
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null); // Reset user state
    toast.success('Logged out successfully!');
    window.location.href = '/'; // Redirect to login page after logout
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
        <LoadingIcon />
      </div>
    );
  }

  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <Router>
        <Routes>
          <Route path="/" element={localStorage.getItem('authToken') ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
          />

          <Route path="/home" element={ localStorage.getItem('authToken') ? (
                <ProtectedRoutes>
                  <Home onLogout={handleLogout} />
                </ProtectedRoutes>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
