import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loggingjs from "../../logging";

function LandingPage() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [participantId, setParticipantId] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    loggingjs.initialize(participantId);
    loggingjs.logEvent("START", "1");
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Form.Label style={{ float: "left" }}>
          Please enter your Participant ID (as provided by Qualtrics)
        </Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Participant ID"
          onChange={(e) => setParticipantId(e.target.value)}
        />
        <br />
        <Button type="submit" style={{ width: "100%" }}>
          START
        </Button>
      </Form>
    </div>
  );
}

export default LandingPage