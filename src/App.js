
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import VerificationPage from './pages/VerificationPage/VerificationPage';
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
          <Route path="/catalog" element={<CatalogPage iv1="Search" iv2={true} iv3={true} trialNum={1} />} />
          <Route path="/verify" element={<VerificationPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;