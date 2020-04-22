import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log(appointment)
    return axios
      .put(`/api/appointments/${id}`, { ...appointment })
      .then((res) => {
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
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
      if (res) {
        setState((prev) => ({ ...prev, appointments: { ...appointments } }));
      }
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
