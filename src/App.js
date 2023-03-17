
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import VerificationPage from './pages/VerificationPage';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage iv1="Search" iv2={1} iv3={1} trialNum={1} />} />
          <Route path="/verify" element={<VerificationPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;