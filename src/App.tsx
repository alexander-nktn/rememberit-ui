import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cards from './pages/Cards';
import About from './pages/About';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Cards />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);

export default App;
