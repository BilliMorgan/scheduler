import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment"
import "components/DayList"
import DayList from "components/DayList";
import Appointment from "components/Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 3,
    time: "2pm",
  },

  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 5,
    time: "10am",
    interview: {
      student: "Roberto Servantes",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 6,
    time: "4pm",
    interview: {
      student: "Fidel Castro",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
];




export default function Application(props) {

  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([])
  useEffect(() => {
    axios.get("/api/days")
      .then((response) => {
        console.log(response);
        setDays([...response.data]);
      });
  },[])
  console.log(days)
  const appointmentsCopy = appointments.map((elem) => {
    return (
      <Appointment key={elem.id}{...elem} />
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
          {
            <DayList
              days={days}
              value={day}
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
        {appointmentsCopy}
      </section>
    </main>
  );
}
