import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewList";

// Form has 5 props: name(string), interviewers(array), interviewer(number), onSave(func), onCancel(func)

export default function Form(props) {

  const [name, setName ] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function validate() {
    console.log("This is the name:", name, "This is the interviewr:", interviewer)
    const options = [1, 2, 3, 4, 5, 6];

    if (!name && !options.includes(interviewer)) {
      console.log("ERRRRORRRR")
      setError("Please enter name and select an interviewer");
      return;
    }

    if (!name) {
      console.log("ERRRRORRRR Name")
      setError("Student name cannot be blank");
      return;
    }

    if (!options.includes(interviewer)) {
      console.log("ERRRRORRRR")
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
            /*
              This must be a controlled component
            */
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