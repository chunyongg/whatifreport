import React from 'react'
import styles from "./CatalogPage.module.css";
import { connect } from "react-redux";

function ModuleCart({modules}) {
  return (
    <div className={styles.moduleCart}>
      <span>Modules Selected:&nbsp;</span>
      {modules.length === 0 ? (
        <span>(None)</span>
      ) : (
        modules.map((mod, i) => <span key={i}>{i > 0 && ", "}{mod.subject}{mod.code}</span>)
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const moduleCart = state.moduleCart;
  return {
    modules: moduleCart
  };
}


export default connect(mapStateToProps)(ModuleCart);