import React from "react";
import InterviewListItem from "components/InterviewListItem";
import "components/InterviewList.scss";

//Interviewer List has 3 props: interviewers(array), interviewer(number), setInterviewer(func)

export default function InterviewList(props) {

  const mapInterviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{mapInterviewers}</ul>
    </section>
  );
  
  // InterviewerList.propTypes = {
  //   interviewers: PropTypes.array.isRequired
  // };
}