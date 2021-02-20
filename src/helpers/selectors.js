export function getAppointmentsForDay (state, day) {
  const res = [];
  const filteredDays = state.days.filter(days => days.name === day); // filter returns: [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ] find: returns object

  if (!filteredDays.length) {
    return filteredDays;
  }

  const appsArr = filteredDays[0].appointments; // [ 1, 2, 3 ]
  appsArr.map(id => res.push(state.appointments[id]));
  return res;

};

// a function to return a new object containing the interview data when we pass it an object that contains the interviewer -- otherwise null
export function getInterview (state, interview) {
  const res = {};
  const interviewerKey = Object.keys(state.interviewers); // [ 1, 2 ]

  if (!interview) {   // return early if its falsy
    return null;
  };
  
  interviewerKey.forEach(key => {
    if (interview.interviewer === parseInt(key)) { // 2 === 2
      res.student = interview.student;
      res.interviewer = state.interviewers[key];
    }
  });
  
  return res;

};

export function getInterviewersForDay (state, day) {
  const res = [];
  const filteredDays = state.days.filter(days => days.name === day);

  if (filteredDays.length) {
    const interviewerArr = filteredDays[0].interviewers; // [ 1, 2, 3 ]
    interviewerArr.map(id => res.push(state.interviewers[id]));
    return res;
  }
  return filteredDays;
};

