import React from "react";
import styles from "./ModuleCart.module.css";
import { connect } from "react-redux";

function ModuleCart({ modules }) {
  const selectedModules = () => {
    return modules.length === 0 ? (
      <p>None</p>
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
      <div className={styles.items}>{selectedModules()}</div>
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
