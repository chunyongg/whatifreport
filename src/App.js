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
import loggingjs from "./logging";
import { IVConditions } from "./data/data";

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
    var i = validA.length;
    while (i--) {
      if (validA[i] === a) {
        return true;
      }
    }
    return false;
  };
  const isBValid = () => {
    return b && (b == 1 || b == 2 || b == 3);
  };
  const isValidLink = () => {
    return (isAValid() && isBValid() && isRoot) || isInit;
  };

  function InvalidContent() {
    return <div>Invalid Link</div>;
  }

  function ValidContent() {
    const values = IVConditions[a];
    return (
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/catalog"
              element={
                <CatalogPage
                  // iv1={values.IV1}
                  // iv2={values.IV2}
                  // iv3={values.IV3}
                  iv1="Alphabet"
                  iv2={true}
                  iv3={true}
                  // trialNum={values.TRIAL}
                />
              }
            />
            <Route path="/verify" element={<VerificationPage />} />
          </Routes>
        </div>
      </Provider>
    );
  }

  return isValidLink ? <ValidContent /> : <InvalidContent />;
}

export default App;
