import React from 'react'
import styles from "./LongYellowButton.module.css";

function LongYellowButton({onClick, children, className}) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default LongYellowButton;