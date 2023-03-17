import React, {useEffect, useState} from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loggingjs, { updateIVsForLogging } from "../../logging";
import { updateCorrectModules } from '../../actions';
import { connect } from 'react-redux';
import { IVConditions, getCorrectModules } from '../../data/data';

function setupIVs(condition, trialTask) {
  const conditions = IVConditions[condition];
  conditions.TRIAL = trialTask;
  updateIVsForLogging(conditions);
}

function setupCorrectModules(condition, trialTask, callback) {
  const modules = getCorrectModules(condition, trialTask);
  callback(modules);
}

function init(condition, trialTask, updateCorrectModules) {
  const parsed = parseInt(trialTask);
  setupCorrectModules(condition, parsed, updateCorrectModules);
  setupIVs(condition, parsed)
}


function LandingPage({updateCorrectModulesCallback}) {
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
    navigate('/home', {replace: true});
  };
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const a = searchParams.get('a');
    const b = searchParams.get('b');
    if (a && b) {
      init(a,b, updateCorrectModulesCallback);
      setIsValidLink(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isValidLink, setIsValidLink] = useState(false);


  if (!isValidLink) {
    return (
      <div>Loading...</div>
    )
  }

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

const mapDispatchToProps = (dispatch) => ({
  updateCorrectModulesCallback: (correctModules) => dispatch(updateCorrectModules(correctModules)),
});
export default connect(null, mapDispatchToProps)(LandingPage);
