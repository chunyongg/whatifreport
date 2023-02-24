import React from 'react'
import styles from "./GreenButton.module.css";

function GreenButton(props) {
  return (
    <button className={styles.greenbutton}>{props.children}</button>
  )
}

export default GreenButton