import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "hooks/useVisualMode";
import "components/Application.scss";
import "components/Appointment";
import "components/DayList";
import "components/Appointment/Show";
import "components/Appointment/Empty";
import "components/Appointment/Error";
const {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} = require("helpers/selectors");

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function setDay(day) {
    setState((prev) => ({ ...prev, day: day }));
  }

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prevState) => ({
        ...prevState,
        days: [...days.data],
        appointments: { ...appointments.data },
        interviewers: { ...interviewers.data },
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // setState({ ...state, appointments });
    return axios
      .put(`/api/appointments/${id}`, { ...appointment })
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          appointments: { ...appointments },
        });
        return res;
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      if (res) {
        setState((prev) => ({ ...prev, appointments: { ...appointments } }));
      }

      return res;
    });
  }

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);

  //schedule
  const schedule = appointments.map((appointment) => {
    console.log(appointment)
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
          {<DayList days={state.days} value={state.day} onChange={setDay} />}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}
