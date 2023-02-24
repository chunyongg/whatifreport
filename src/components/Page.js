import React from 'react';
import styles from "./Page.module.css"; 

function Page(props) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>What If Report</div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

export default Page