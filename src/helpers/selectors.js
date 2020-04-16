export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((elem) => elem.name === day);
  if (filteredDays.length > 0) {
    return filteredDays[0].appointments.map((elem) => state.appointments[elem]);
  } else {
    return filteredDays;
  }
};