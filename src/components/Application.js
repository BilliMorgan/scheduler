import React from "react";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";
import Status from "./Appointment/Status";

const {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} = require("helpers/selectors");

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    isLoading
  } = useApplicationData();
  console.log(state)
  console.log(isLoading)

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment} 
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {<DayList days={state.days} value={state.day} onChange={setDay} />}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {isLoading && (
          <Status message="Waking up the server. Please, refresh the page in a few seconds."></Status>
        )}
        {!isLoading && (
          <>
            {appointments}
            <Appointment key="last" time="5pm" />
          </>
        )}
      </section>
    </main>
  )
}

