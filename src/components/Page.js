import React from 'react';
import styles from "./Page.module.css"; 

function Page(props) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <button className={styles.bluebutton}>❮ &nbsp; What-if Report</button>
        <div>{props.title}</div>
        <div>
          <button className={styles.whitebutton}>
            <div className="emoji-font" style={{ fontSize: "18px" }}>
              🏠
            </div>
          </button>
          <button className={styles.whitebutton}>
            <div className="emoji-font" style={{ fontSize: "18px" }}>
              ⋮
            </div>
          </button>
          <button className={styles.bluebutton}>
            <div className="emoji-font" style={{ fontSize: "18px" }}>
              🧭
            </div>
          </button>
        </div>
      </div>
      <div className={styles.scrollarea}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
}

export default Page