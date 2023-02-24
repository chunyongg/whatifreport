import React from 'react'
import styles from "./LongYellowButton.module.css";

function LongYellowButton(props) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default LongYellowButton;