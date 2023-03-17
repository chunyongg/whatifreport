import React, {useState} from 'react';
import Page from '../components/Page';
import styles from "./HomePage.module.css";
import BlueButton from '../components/BlueButton';
import GreenButton from '../components/GreenButton';
import ShortGreenButton from '../components/ShortGreenButton';
import Popup from "../components/Popup";

import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { removeModule } from "../actions";
import { editableInputTypes } from '@testing-library/user-event/dist/utils';

function HomePage({moduleCart, removeModule}) {
  const navigate = useNavigate();
  const openCourseCatalog = () => {
    navigate("/catalog");
  }
  const routeToVerify = () => {
    navigate("/verify");
  }
  const [showPopup, setShowPopup] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const handleDeleteModule = (module) => {
    setShowPopup(true);
    setModuleToDelete(module);
  }
  const deleteModule = () => {
    removeModule(moduleToDelete);
    setShowPopup(false);
  }
  return (
    <Page title="Create What-if Scenario">
      <Popup
        show={showPopup}
        onHide={() => setShowPopup(false)}
        deleteModule={deleteModule}
      />
      <div className={styles.p}>
        <h1 className={styles.h1}>Create What-if Scenario</h1>
        <h4 className={styles.h4}>
          You may be thinking of changing your program of study or taking
          certain courses. Using this page, you can set up a what-if scenario
          based on different academic programs or courses. Select the Submit
          Request button to request a degree progress report based on your
          what-if information.
        </h4>
        <div style={{ height: "10px" }} />
        <div className="align-right">
          <BlueButton>Return To Report Selection</BlueButton>
        </div>
      </div>
      <div className={styles.p}>
        <h2 className={styles.h2}>Career Scenario</h2>
        <h4 className={styles.h4}>
          &ensp;Select a career for which you want the change to take place.
        </h4>
        <div style={{ height: "30px" }} />
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Institution</th>
              <th className={styles.th}>Program</th>
              <th className={styles.th}>Requirement Term</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.td}>NUS</td>
              <td className={styles.td}>Bachelor of Computing</td>
              <td className={styles.td}>2019/2020 Semester 1</td>
            </tr>
          </tbody>
        </table>
        <div style={{ height: "27px" }} />
        <div className="align-right">
          <GreenButton>Submit Request</GreenButton>
        </div>
      </div>
      <div style={{ height: "10px" }} />
      <div className={styles.p}>
        <h2 className={styles.h2}>Program Scenario</h2>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trcol}>
              <td className={styles.td1}>Program: Bachelor of Computing</td>
              <td className={styles.td2}></td>
              <td className={styles.td3}>NUS | Undergraduate</td>
              <td className={styles.td4}>
                Degree: BComp (Computer Science)
                <br />
                &emsp;&emsp;Honors: Computer Science (Hons)
                <br />
                Minor: Interactive Media Dev (Minor)
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ height: "10px" }} />
      </div>
      <div style={{ height: "23px" }} />
      <div className={styles.p}>
        <h2 className={styles.h2}>Course Scenario</h2>
        <h4 className={styles.h4} style={{ margin: "17px 8px" }}>
          Select the "browse course catalog" button and then select courses for
          inclusion in your course what-if
          <br />
          scenario.
        </h4>
        <ShortGreenButton onClick={openCourseCatalog}>
          browse course catalog
        </ShortGreenButton>
        <div style={{ height: "5px" }} />
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th} width={20}></th>
              <th className={styles.th} width={39}>
                Term
              </th>
              <th className={styles.th} width={49}>
                Subject
              </th>
              <th className={styles.th} width={56}>
                Catalog Nbr
              </th>
              <th className={styles.th} width={142}>
                Course Name
              </th>
              <th className={styles.th} width={60}>
                Grading Basis
              </th>
              <th className={styles.th} width={46}>
                S/U Option
              </th>
              <th className={styles.th} width={55}>
                Grade
              </th>
              <th className={styles.th} width={65}>
                Units
              </th>
              <th className={styles.th} width={55}>
                Topic ID
              </th>
              <th className={styles.th} width={25}></th>
            </tr>
          </thead>
          <tbody>
            {moduleCart.length === 0 ? (
              <tr key={-1}>
                <td className={styles.td}>
                  <div className="align-right">{1}</div>
                </td>
                <td className={styles.tdempty}></td>
                <td className={styles.tdempty}></td>
                <td className={styles.tdempty}></td>
                <td className={styles.tdempty}></td>
                <td className={styles.tdempty}></td>
                <td className={styles.tdempty}>
                  <input type="checkbox" />
                </td>
                <td className={styles.tdempty}>
                  <input className={styles.textinput} />
                  &nbsp;🔍
                </td>
                <td className={styles.tdempty}>
                  <div className="align-right">0.00</div>
                </td>
                <td className={styles.tdempty}></td>
                <td className={styles.tdempty} style={{ textAlign: "center" }}>
                  <button
                    className={styles.removebutton}
                    onClick={() => handleDeleteModule(module)}
                  >
                    —
                  </button>
                </td>
              </tr>
            ) : (
              moduleCart.map((module, index) => (
                <tr key={index} role="button" className={styles.tr}>
                  <td className={styles.td}>
                    <div className="align-right">{index + 1}</div>
                  </td>
                  <td className={styles.td}>2220</td>
                  <td className={styles.td}>{module.subject}</td>
                  <td className={styles.td}>{module.code}</td>
                  <td className={styles.td}>{module.courseName}</td>
                  <td className={styles.td}>GRD</td>
                  <td className={styles.td}>
                    <input type="checkbox" />
                  </td>
                  <td className={styles.td}>
                    <input className={styles.textinput} />
                    &nbsp;🔍
                  </td>
                  <td className={styles.td}>
                    <div className="align-right">4.00</div>
                  </td>
                  <td className={styles.td}></td>
                  <td className={styles.td} style={{ textAlign: "center" }}>
                    <button
                      className={styles.removebutton}
                      onClick={() => handleDeleteModule(module)}
                    >
                      —
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div style={{ height: "35px" }} />
      <div className="align-right">
        <GreenButton onClick={routeToVerify}>
          Generate What-If Report
        </GreenButton>
      </div>
      <div style={{ height: "30px" }} />
    </Page>
  );
}

function mapStateToProps(state) {
  const moduleCart = state.moduleCart;
  return {
    moduleCart
  };
}

const mapDispatchToProps = (dispatch) => ({
  removeModule: (module) => dispatch(removeModule(module)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);