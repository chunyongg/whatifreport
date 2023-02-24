import React from 'react'
import styles from "./ShortYellowButton.module.css";

function ShortYellowButton(props) {
  return <button className={styles.button}>{props.children}</button>;
}

export default ShortYellowButton