import React from 'react'
import styles from "./BlueButton.module.css";

function BlueButton(props) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default BlueButton;