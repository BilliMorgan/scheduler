import React from "react"


// {student: "Lydia Miller-Jones", interviewer: {…}, onEdit: ƒ, onDelete: ƒ}
// student: "Lydia Miller-Jones"
// interviewer: {id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png"}
// onEdit: ƒ action()
// onDelete: ƒ action()
// __proto__: Object



export default function Show(props){
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
          />
        </section>
      </section>
    </main>
  );
}