import React from 'react'
import styles from "./LongYellowButton.module.css";

function LongYellowButton(props) {
  return <button className={styles.longyellowbutton}>{props.children}</button>;
}

export default LongYellowButton;