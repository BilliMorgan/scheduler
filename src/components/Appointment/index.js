import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode"
//import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import Form from "./Form";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRMING = "CONFIRMING"
const EDIT = "EDIT"
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //onSave in the Form.js
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then((res) => transition(SHOW))
      .catch((res) => transition(ERROR_SAVE, true));
  }
  const edit = function (){
    transition(EDIT);
    
  
  }
  const onConfirm = function () {
    transition(CONFIRMING)
  }
  const onDelete = function () {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then((res) => transition(EMPTY))
      .catch((res) => transition(ERROR_DELETE, true));
  }
  return (
    <article className="appointment">
      <header className="Header">{props.time}</header>
      {mode === ERROR_DELETE && (
        <Error message="It's a delete error baby" onClose={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="It's a save error baby" onClose={() => back()} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVING && <Status message="on my way" />}
      {mode === CONFIRMING && (
        <Confirm
          message="are you sure?"
          onCancel={() => back()}
          onDelete={onDelete}
        />
      )}
      {mode === DELETING && <Status message="good bye" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={onConfirm}
          edit={edit}
        />
      )}
    </article>
  );
}
