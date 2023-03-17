import React from 'react';
import Modal from "react-bootstrap/Modal";
import ShortYellowButton from "./ShortYellowButton";
import styles from "./Popup.module.css";

function Popup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      animation={false}
      backdrop="static"
      keyboard={false}
      centered
    >
      <div className={styles.container}>
        <div className={styles.title}>Delete Confirmation</div>
        <hr className={styles.divider} />
        <div className={styles.text}>
          Delete current/selected rows from this page? The delete will occur
          when the transaction is saved.
        </div>
        <div>
          &ensp;
          <ShortYellowButton onClick={props.deleteModule}>OK</ShortYellowButton>
          &nbsp;
          <ShortYellowButton onClick={props.onHide}>Cancel</ShortYellowButton>
        </div>
      </div>
    </Modal>
  );
}

export default Popup