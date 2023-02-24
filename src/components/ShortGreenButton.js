import React from 'react'
import styles from "./ShortGreenButton.module.css";

function ShortGreenButton(props) {
  return (
    <button className={styles.button}>{props.children}</button>
  )
}

export default ShortGreenButton;