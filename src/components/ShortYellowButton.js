import React from 'react'
import styles from "./ShortYellowButton.module.css";

function ShortYellowButton(props) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default ShortYellowButton