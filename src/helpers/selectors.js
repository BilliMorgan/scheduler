function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((elem) => elem.name === day);
  if (filteredDays.length > 0) {
    return filteredDays[0].appointments.map((elem) => state.appointments[elem]);
  } else {
    return filteredDays;
  }
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const newObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return newObj;
}

function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((elem) => elem.name === day);
  if (filteredDays.length > 0) {
    return filteredDays[0].interviewers.map((elem) => state.interviewers[elem]);
  } else {
    return filteredDays;
  }
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
