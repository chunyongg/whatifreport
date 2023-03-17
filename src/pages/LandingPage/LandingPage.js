// Create a landing page
// 1. Ask user for participant ID, this will be provided in Qualtrics
// 2. After they click start, validate the participant ID is non-null, non-empty and is a string. If it fails, show an error message
// 3. Call loggingjs.initialize() and pass in the participant ID
// 4. Call loggingjs.initialize() with the following params: 'START', '1' 
// 5. Redirect user to HomePage.js
// Note: '1' must be a String, not Number
// Once done, check https://docs.google.com/spreadsheets/d/11xAgg8_D9qaoKgkyHCbb88NgPFO0z3WqPhBT4Cw1H2A/edit?resourcekey#gid=114586490 to ensure your log is done
// Try to make the style consistent with the rest of the What-if report
import React, {useState} from 'react'
import styles from "./LandingPage.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function LandingPage() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className={styles.container}>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Form.Label style={{float: "left"}}>
          Please enter your Participant ID (as provided by Qualtrics)
        </Form.Label>
        <Form.Control required type="text" placeholder="Participant ID" />
        <br/>
        <Button type="submit" style={{width: "100%"}}>Submit form</Button>
      </Form>
    </div>
  );
}

export default LandingPage