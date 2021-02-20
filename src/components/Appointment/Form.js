import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewList";

// Form has 5 props: name(string), interviewers(array), interviewer(number), onSave(func), onCancel(func)

export default function Form(props) {

  const [name, setName ] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  console.log("These are my props:", props)
  console.log("This is my name", name)
  console.log("This is my interviewer", interviewer);

  const reset = () => {
      setName("");
      setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const onClick = () => {
    props.onSave(name, interviewer);
  }

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
            /*
              This must be a controlled component
            */
          />

        </form>

        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={onClick}>Save</Button>
        </section>
      </section>
    </main>
  );

};