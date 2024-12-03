import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Cards from './pages/Cards';
import Profile from './pages/Profile';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Cards />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
);

export default App;
