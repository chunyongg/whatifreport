import "./App.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import loggingjs, { IVs } from "./logging";
import { IVConditions } from "./data/data";
import invalidLink from "./assets/404.jpg";
const store = createStore(rootReducer);

function App() {
  // Link the query params to the correct IV level
  // If the query params do not belong to any condition number or the trial task is not a value from 1-3 inclusive, do not allow the user to proceed (show "Invalid Link")
  const [searchParams] = useSearchParams();
  const a = searchParams.get("a");
  const b = searchParams.get("b");
  const isInit = loggingjs.isInitialized();
  const path = useLocation().pathname;
  const isRoot = path === "/";
  const validA = Object.keys(IVConditions);
  const isAValid = () => {
    if (!a) {
      return false;
    }
    return validA.find((item) => item === a);
  };
  const isBValid = () => {
    if (!b) {
      return false;
    }
    const intB = parseInt(b);
    return intB === 1 || intB === 2 || intB === 3;
  };
  const isValidLink = () => {
    return (isAValid() && isBValid() && isRoot) || isInit;
  };
  if (!isInit && isValidLink()) {
    IVs.IV1 = IVConditions[a].IV1;
    IVs.IV2 = IVConditions[a].IV2;
    IVs.IV3 = IVConditions[a].IV3;
    IVs.TRIAL = parseInt(b);
  }

  function InvalidContent() {
    return <div className="invalid">
    <img src={invalidLink} alt="Invalid img" width="500" />
    <h1>Invalid Link</h1>
    </div>;
  }

  function ValidContent() {
    return (
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/catalog"
              element={
                <CatalogPage iv1={IVs.IV1} iv2={IVs.IV2} iv3={IVs.IV3} />
              }
            />
            <Route path="/verify" element={<VerificationPage />} />
          </Routes>
        </div>
      </Provider>
    );
  }

  return isValidLink() ? <ValidContent /> : <InvalidContent />;
}

export default App;
