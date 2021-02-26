import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import "components/Appointment/styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY );

  // SAVE FUNCTION
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview( props.id, interview )
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  };

  // CANCEL FUNCTION
  const cancel  = () => {
    console.log("CANCEL")

    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => { transition(EMPTY) })
    .catch(error => transition(ERROR_DELETE, true));
  };

  return ( 
    <article className="appointment" data-testid="appointment">
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

      {mode === SHOW && 
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
        />}

      {mode === EDIT && 
        <Form 
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={back}
        />}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error message="Cannot Save" onClose={back}/>}
      {mode === ERROR_DELETE && <Error message="Cannot Delete" onClose={back} />}

    </article>
    );

};