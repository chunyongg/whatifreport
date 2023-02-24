import React from 'react'
import styles from "./ShortGreenButton.module.css";

function ShortGreenButton(props) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default ShortGreenButton;