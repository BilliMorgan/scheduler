import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const [isLoading, setIsLoading] = useState(false)

  function setDay(day) {
    setState((prev) => ({ ...prev, day: day }));
  }

  useEffect(() => {
  setIsLoading(true)
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
      setIsLoading(false)
    });
  }, []);

  const updateSpots = (status) => {
    const currentDay = state.days.filter((elem) => elem.name === state.day)[0];
    
    if (status === "minus") {
      currentDay.spots -= 1;
    }
    if (status === "plus") {
      currentDay.spots += 1;
    }
    const days = state.days.map((elem) => {
      if (elem.id === currentDay.id) {
        return currentDay;
      }
      return elem;
    });
    setState((prev) => ({ ...prev, days: [...days] }));
  };

  function bookInterview(id, interview) {
    let status = "";
    if (state.appointments[id].interview === null) {
    status = "minus"
    }
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, { ...appointment })
      .then((res) => {
        updateSpots(status);
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
      updateSpots("plus");
      if (res) {
        setState((prev) => ({ ...prev, appointments: { ...appointments } }));
      }
    });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots,
    isLoading,
  }
}
