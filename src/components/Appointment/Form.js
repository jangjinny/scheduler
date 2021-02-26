import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewList";

export default function Form(props) {

  const [name, setName ] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function validate() {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const interviewerIsChecked = options.includes(interviewer);

    if (!name && !interviewerIsChecked) {
      setError("Please enter name and select an interviewer");
      return;
    }

    if (!name) {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewerIsChecked) {
      setError("Please choose an interviewer");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }

  const reset = () => {
      setName("");
      setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>

          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)} 
            data-testid="student-name-input"
          />

        </form>
        <section className="appointment__validation">{error}</section>

        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );

};