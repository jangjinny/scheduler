import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import "components/Appointment/styles.scss"

//if props.interviewer is truthy, render SHOW otherwise render EMPTY

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview( props.id, interview )
    .then(() => {
      transition(SHOW)
      console.log("THIS ISHS HOW FUNCTION ")
    })
  };

  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const cancel  = () => {
    console.log("CANCEL")

    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
  };

  return ( 
    <article className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && 
        <Confirm
        message="Delete the appointment?"
        onCancel={back} 
        onConfirm={cancel}
        />}

      {mode === CREATE && 
        <Form
        interviewers={props.interviewers}
        interviewer={{}}
        onCancel={back}
        onSave={save}
        />}

      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => console.log("onEdit")}
        onDelete={confirmDelete}
        />
        )}

        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}

    </article>
    );


};