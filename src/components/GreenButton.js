import React from 'react'
import styles from "./GreenButton.module.css";

function GreenButton(props) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default GreenButton