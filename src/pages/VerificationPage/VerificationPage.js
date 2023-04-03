import React from "react";
import styles from "./VerificationPage.module.css";
import BlueButton from "../../components/BlueButton";
import { useNavigate } from "react-router-dom";
import { getSuccessCode } from "../../constants";
import loggingjs from "../../logging";
import { connect } from "react-redux";
import { resetModuleAddedList, restart } from "../../actions";

function Pass() {
  const code = getSuccessCode().toString();
  return (
    <div className={styles.container}>
      <h1 className={styles.green}>Graduation requirements passed</h1>
      <p>
        Success code: <span className={styles.big}>{code}</span>
      </p>
    </div>
  );
}

function Fail({restart, resetList}) {
  const navigate = useNavigate();
  const restartCallback = () => {
    restart();
    resetList();
    navigate("/home/", { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.red}>Graduation requirements failed</h1>
      <p>Please try again and add the correct modules</p>
      <BlueButton className={styles.button} onClick={restartCallback}>
        Restart
      </BlueButton>
    </div>
  );
}

function VerificationPage({ isIdentical, restart, resetList }) {
  return isIdentical ? <Pass /> : <Fail restart={restart} resetList={resetList} />;
}

function mapStateToProps(state) {
  const moduleCart = state.moduleCart;
  const data = state.data;
  const correctModules = data.correctModules;
  const isIdentical =
    moduleCart.length === correctModules.length &&
    moduleCart.every((currentMod) => {
      const correctMod = correctModules.filter(
        (mod) =>
          mod.subject === currentMod.subject && mod.code === currentMod.code
      );
      return correctMod.length > 0;
    });
  if (isIdentical) {
    loggingjs.logEvent("COMPLETE", "1");
  } else {
    const modulesMissing = correctModules.filter((mod) => {
      const isAdded = moduleCart.find((modAdded) => modAdded.subject === mod.subject && modAdded.code === mod.code);
      return !isAdded;
    }).join(', ');
    loggingjs.logEvent("MISSING_MODULES", modulesMissing);
    loggingjs.logEvent("FAIL", "1");
  }
  return {
    isIdentical,
  };
}

const mapDispatchToProps = (dispatch) => ({
  restart: () => dispatch(restart()),
  resetList: () => dispatch(resetModuleAddedList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerificationPage);
