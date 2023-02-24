import React from 'react'
import styles from "./BlueButton.module.css";

function BlueButton(props) {
  return <button className={styles.bluebutton}>{props.children}</button>;
}

export default BlueButton;