export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((days) => days.name === day);
  if (!state.days.length || !foundDay) {
    return [];
  }

  return foundDay.appointments.map((id) => state.appointments[id]);
};

export function getInterview (state, interview) {
  if (!interview) { 
    return null;
  };

  const id = interview.interviewer;
  const newInterview = {...interview, interviewer: state.interviewers[id]}

  return newInterview;
};

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find((days) => days.name === day);
  if (!state.days.length || !foundDay) {
    return [];
  }

  return foundDay.interviewers.map((id) => state.interviewers[id]);
};

