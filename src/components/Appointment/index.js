import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode"
//import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  
  return (
    <>
      <header className="Header">{props.time}</header>
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />

      )}
      {/* {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      ) : (
        <Empty />
      )} */}

      <article className="appointment"></article>
    </>
  );
}
