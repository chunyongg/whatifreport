import React from 'react';
import styles from "./Page.module.css"; 

function Page(props) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>{props.title}</div>
      <div className={styles.scrollarea}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
}

export default Page