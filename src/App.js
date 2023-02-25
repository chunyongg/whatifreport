import logo from './logo.svg';
import './App.css';

import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CatalogPage />} />
      </Routes>
    </div>
  );
}

export default App;
