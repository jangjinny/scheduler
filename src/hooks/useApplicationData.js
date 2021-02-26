import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const updateSpots = function (day, days, appointments) {
    
    const newDays = [...days];
    const dayObj = newDays.find((item) => item.name === day);
    const appointmentsIds = dayObj.appointments;

    let spots = 0;
    for (const id of appointmentsIds) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++; 
      }
    }

    dayObj.spots = spots;
    const newDaysObj = [...newDays];
    return newDaysObj;
  };

  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const url = `http://localhost:8001/api/appointments/${id}`
    return axios.put(url, appointment)
    .then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days})
    })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `http://localhost:8001/api/appointments/${id}`
    return axios.delete(url)
    .then(() => { 
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days}) 
    })
  };

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });

  // api requests
  const getDaysPromise = axios.get(`http://localhost:8001/api/days`);
  const getAppsPromise = axios.get(`http://localhost:8001/api/appointments`);
  const getInterviewersPromise = axios.get(`http://localhost:8001/api/interviewers`);
  const promises = [getDaysPromise, getAppsPromise, getInterviewersPromise];

  useEffect(() => {
    Promise.all(promises)
      .then((all)=> {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
    }, []);

  return { state, setDay, bookInterview, cancelInterview };
};
