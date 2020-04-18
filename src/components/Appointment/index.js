import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode"
//import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Form from "./Form";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRMING = "CONFIRMING"



export default function Appointment(props) {
  //console.log(props.interview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //onSave in the Form.js
  const save = function (name, interviewer) {

    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then((res) => transition(SHOW))
  }
  const onConfirm = function () {
    transition(CONFIRMING)

  }
  const onDelete = function () {
    transition(DELETING)
    
    props.cancelInterview(props.id)
      .then((res) => transition(EMPTY))
      

  }
  return (
    <>
      <header className="Header">{props.time}</header>

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="on my way" />}
      {mode === CONFIRMING &&
        <Confirm
          message="are you sure?"
          onCancel={() => back()}
          onDelete={onDelete}
        />}
      {mode === DELETING && <Status message="good bye" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={onConfirm}
        />
      )}


      <article className="appointment"></article>
    </>
  );
}
