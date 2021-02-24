import { useState, useEffect } from "react";
import axios from "axios";


// export default function useApplicationData() {
//   // api requests
//   const getAxios = () => {
//     const getDaysPromise = axios.get(`http://localhost:8001/api/days`);
//     const getAppsPromise = axios.get(`http://localhost:8001/api/appointments`);
//     const getInterviewersPromise = axios.get(`http://localhost:8001/api/interviewers`);
//     const promises = [getDaysPromise, getAppsPromise, getInterviewersPromise];

//     return promises;
//   };
  
//   const fetchAPI = () => {
//     Promise.all(getAxios())
//     .then((all)=> {
//       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
//     })
//   };
  
//   useEffect(() => {
//     console.log('useApplication data useEffect');
//     Promise.all(getAxios())
//     .then((all)=> {
//       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
//     })
//     }, []);
    
//     const [state, setState] = useState({
//       day: "Monday",
//       days: [],
//       appointments: {},
//       interviewers: []
//     });
    
//     const setDay = day => setState({ ...state, day });
    
//     // function to book interviews
//     const bookInterview = (id, interview) => {
      
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };
    
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
    
//     const url = `http://localhost:8001/api/appointments/${id}`
//     return axios.put(url, appointment)
//     .then(() => { 
//       setState({ ...state, appointments})
//     })
//     .then(() => { fetchAPI() })
//   };

//   const cancelInterview = (id) => {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };
    
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
    
//     const url = `http://localhost:8001/api/appointments/${id}`
//     return axios.delete(url)
//     .then(() => { 
//       setState({ ...state, appointments})
//     })
//     .then(() => { fetchAPI() })
//   };  

//   return { state, setDay, bookInterview, cancelInterview };
// };


  export default function useApplicationData() {

    const updateSpots = function (day, days, appointments) {
    
      const dayObj = days.find((item) => item.name === day);
      const appointmentsIds = dayObj.appointments; // look at appointments if the day matches
  
      let spots = 0;
      for (const id of appointmentsIds) {
        const appointment = appointments[id];
        if (!appointment.interview) {
          spots++; // if its null add spots
        }
      }

      dayObj.spots = spots;

      const newDays = [...days];
      return newDays;
    };
  
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
      console.log('useApplication data useEffect');
      Promise.all(promises)
        .then((all)=> {
          setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
        })
      }, []);
  
    return { state, setDay, bookInterview, cancelInterview };
  };
