import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlanetPage from './planets/PlanetPage';

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/planet/mercury" />} />
        <Route path="/planet/:name" element={<PlanetPage />} />
      </Routes>
    </Router>
  );
}

export default App;