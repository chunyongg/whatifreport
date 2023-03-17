import React from 'react'
import styles from "./CatalogPage.module.css";

function ModuleCart({modules}) {
  return (
    <div className={styles.moduleCart}>
      <span>Modules Selected:&nbsp;</span>
      {modules.length === 0 ? (
        <span>(None)</span>
      ) : (
        modules.map((mod, i) => <span key={i}>{i > 0 && ", "}{mod}</span>)
      )}
    </div>
  );
}

export default ModuleCart