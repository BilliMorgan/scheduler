function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((elem) => elem.name === day);
  if (filteredDays.length > 0) {
    return filteredDays[0].appointments.map((elem) => state.appointments[elem]);
  } else {
    return filteredDays;
  }
};


function getInterview(state, interview) {
 if(!interview){return null}
const newObj={student: interview.student,
interviewer: state.interviewers[interview.interviewer]}
return newObj  
};

    module.exports = { getAppointmentsForDay, getInterview }