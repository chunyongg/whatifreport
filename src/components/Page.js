import React from "react";
import styles from "./Page.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import ModuleCart from "./ModuleCart";

function Page(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateBack = () => {
    const path = location.pathname;
    if (path !== "/") {
      navigate(-1);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <button className={styles.bluebutton} onClick={navigateBack}>
          ❮ &nbsp; What-if Report
        </button>
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
      <div className={styles.area}>
        <div className={styles.scrollarea}>
          <div className={styles.content}>{props.children}</div>
        </div>
        <div className={styles.sidebar}>
          <ModuleCart />
        </div>
      </div>
    </div>
  );
}

export default Page;
