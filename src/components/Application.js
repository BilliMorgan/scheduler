import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import "components/Appointment"
import "components/DayList"
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "hooks/useVisualMode"
import "components/Appointment/Show";
import "components/Appointment/Empty";
import "components/Appointment/Error";
const {getAppointmentsForDay, getInterview} = require('helpers/selectors')

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function setDay(day) {
    setState(prev => ({ ...prev, day: day }))
  };

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3)
    ])
      .then((all) => {
        const [days, appointments, interviewers] = all;
        setState(prevState => ({ ...prevState, days: [...days.data], appointments: { ...appointments.data }, interviewers: { ...interviewers.data } }))
      });
  }, [])


  const appointments = getAppointmentsForDay(state, state.day)
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });


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
          {
            <DayList
              days={state.days}
              value={state.day}
              onChange={setDay}
            />
          }
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}

      </section>
    </main>
  );
}
