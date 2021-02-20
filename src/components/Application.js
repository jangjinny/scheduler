import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });
  const interviewersForDay = getInterviewersForDay(state, state.day);
  const apps = getAppointmentsForDay(state, state.day); //array of appointments for the day

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
      console.log("THis is the ERROR in bookInterview");
      setState({ ...state, appointments})
    })
    .catch(err => console.log(err))

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
      setState({ ...state, appointments})
      console.log(" THIS IS HT ERROR")
    })
    .catch(() => console.log("AXIOS ERROR"))

  };  
  
  const schedule = apps.map((app) => {
    const interview = getInterview(state, app.interview)

    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


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
    });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      
      </section>
    </main>
  );
}