import React from "react";
import styles from "./Page.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import ModuleCart from "./ModuleCart";
import { allLevels } from "../constants";
import { connect } from "react-redux";
import loggingjs from "../logging";
import { firstClick } from "../actions";

function Page(props) {
  const {hasClickedFirstClick, updateFirstClick} = props;
  const navigate = useNavigate();
  const location = useLocation();
  const navigateBack = () => {
    const path = location.pathname;
    if (path !== "/" && path !== "/home") {
      if (!hasClickedFirstClick) {
        updateFirstClick();
        loggingjs.logEvent('FIRST_CLICK_FAIL', 1);
      }
      navigate(-1);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <button className={styles.bluebutton} onClick={navigateBack}>
          ❮ &nbsp; What-if Report
        </button>
        <div>{props.title}</div>
        <div>
          <button className={styles.whitebutton}>
            <div className="emoji-font" style={{ fontSize: "18px" }}>
              🏠
            </div>
          </button>
          <button className={styles.whitebutton}>
            <div className="emoji-font" style={{ fontSize: "18px" }}>
              ⋮
            </div>
          </button>
          <button className={styles.bluebutton}>
            <div className="emoji-font" style={{ fontSize: "18px" }}>
              🧭
            </div>
          </button>
        </div>
      </div>
      <div className={styles.area}>
        <div className={styles.scrollarea}>
          <div className={styles.content}>{props.children}</div>
        </div>
        {props.iv3 === allLevels.PRESENT && (
          <div className={styles.sidebar}>
            <ModuleCart />
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    hasClickedFirstClick: state.data.hasClickedFirstClick,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateFirstClick: () => dispatch(firstClick()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);

