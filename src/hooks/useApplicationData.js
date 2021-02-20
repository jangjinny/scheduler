import { useState, useEffect } from "react";
import axios from "axios";

// return an object with four keys

export default function useApplicationData() {

  // api requests
  const getAxios = () => {
    const getDaysPromise = axios.get(`http://localhost:8001/api/days`);
    const getAppsPromise = axios.get(`http://localhost:8001/api/appointments`);
    const getInterviewersPromise = axios.get(`http://localhost:8001/api/interviewers`);
    const promises = [getDaysPromise, getAppsPromise, getInterviewersPromise];

    return promises;
  };

  useEffect(() => {
    console.log('useApplication data useEffect');
    Promise.all(getAxios())
      .then((all)=> {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
    }, []);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const fetchAPI = () => {  
    Promise.all(getAxios())
      .then((all)=> {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      });
  };

  const setDay = day => setState({ ...state, day });

  // function to book interviews
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
    .then(() => { setState({ ...state, appointments}) })
    .then(() => fetchAPI());

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
    .then(() => { setState({ ...state, appointments}) })
    .then(() => fetchAPI());
  };  

  return { state, setDay, bookInterview, cancelInterview };
};