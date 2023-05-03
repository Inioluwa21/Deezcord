import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import ChatPage from './pages/ChatPage';
import { AuthProvider } from './AuthContext';
import AdminPage from './pages/AdminPage';
import SearchPage from './pages/SearchPage';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Signin" element={<SignInPage />} />
          <Route path="/Chat" element={<ChatPage />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/Search" element={<SearchPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
