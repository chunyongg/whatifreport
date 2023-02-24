import React from 'react'
import styles from "./LongYellowButton.module.css";

function LongYellowButton(props) {
  return <button className={styles.button}>{props.children}</button>;
}

export default LongYellowButton;