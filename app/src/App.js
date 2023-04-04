import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import ChatPage from './pages/ChatPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Signin" element={<SignInPage />} />
        <Route path="/Chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
