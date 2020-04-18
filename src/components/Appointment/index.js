import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode"
//import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status"
import Form from "./Form";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"



export default function Appointment(props) {
  console.log(props.interview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    
    
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then((res) => { transition(SHOW) })

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
      {mode=== SAVING && <Status message="on my way"/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}


      <article className="appointment"></article>
    </>
  );
}
