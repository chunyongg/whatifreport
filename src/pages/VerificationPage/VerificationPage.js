// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./VerificationPage.module.css";
import BlueButton from "../../components/BlueButton";
import { useNavigate } from "react-router-dom";
import { getSuccessCode } from "../../constants";
import loggingjs from "../../logging";

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

function Fail() {
  const navigate = useNavigate();
  const restart = () => {
    navigate("/home/", { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.red}>Graduation requirements failed</h1>
      <p>Please try again and add the correct modules</p>
      <BlueButton className={styles.button} onClick={restart}>
        Restart
      </BlueButton>
    </div>
  );
}

function VerificationPage({ isIdentical }) {
  return isIdentical ? <Pass /> : <Fail />;
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
    loggingjs.logEvent("FAIL", "1");
  }
  return {
    isIdentical,
  };
}
export default connect(mapStateToProps)(VerificationPage);
