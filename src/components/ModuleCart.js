import React from "react";
import styles from "./ModuleCart.module.css";
import LongYellowButton from "./LongYellowButton";
import { connect } from "react-redux";

function ModuleCart({ modules }) {
  return (
    <div className={styles.moduleCart}>
      <p className={styles.title}>Modules Selected:</p>
      {modules.length === 0 ? (
        <p>(None)</p>
      ) : (
        modules.map((mod, i) => (
          <p key={i} className={styles.item}>
            {" "}
            {mod.subject}
            {mod.code}
          </p>
        ))
      )}
      <LongYellowButton>Next</LongYellowButton>
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
