import React from "react";
import styles from "./ModuleCart.module.css";
import LongYellowButton from "./LongYellowButton";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function ModuleCart({ modules }) {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  const selectedModules = () => {
    return modules.length === 0 ? (
      <p>(None)</p>
    ) : (
      modules.map((mod, i) => (
        <p key={i} className={styles.item}>
          {" "}
          {mod.subject}
          {mod.code}
        </p>
      ))
    );
  };
  return (
    <div className={styles.moduleCart}>
      <p className={styles.title}>Modules Selected:</p>
      <p className={styles.items}>{selectedModules()}</p>
      <p className={styles.footer}>
        <LongYellowButton className={styles.btn} onClick={navigateBack}>
          Next
        </LongYellowButton>
      </p>
    </div>
  );
}

function mapStateToProps(state) {
  const moduleCart = state.moduleCart;
  return {
    modules: moduleCart,
  };
}

export default connect(mapStateToProps)(ModuleCart);
