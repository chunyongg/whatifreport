
import './App.css';
import { useLocation, useSearchParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import VerificationPage from './pages/VerificationPage/VerificationPage';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import loggingjs from './logging';

const store = createStore(rootReducer)

function App() {
  const [searchParams] = useSearchParams();
  const a = searchParams.get('a');
  const b = searchParams.get('b');
  const isInit = loggingjs.isInitialized();
  const path = useLocation().pathname;
  const isRoot = path === '/';
  const isValidLink = (a && b && isRoot) || isInit;
  if (!isValidLink) {
    return <div>Invalid Link</div>
  }

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage iv1="Search" iv2={true} iv3={true} trialNum={1} />} />
          <Route path="/verify" element={<VerificationPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;




