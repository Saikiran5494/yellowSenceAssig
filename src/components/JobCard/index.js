import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "./index.css";

const JobCard = (props) => {
  const { jobData } = props;
  const { title, phone, location, salaryMin, salaryMax, openings, hours, id } =
    jobData;

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <div className="card-container">
        <h1 className="title">{title}</h1>
        <p className="location">Location : {location}</p>
        <p className="salary">
          Salary : {salaryMin} - {salaryMax}
        </p>
        <p className="openings">Openings : {openings}</p>
        <p className="type">Work-Type : {hours}</p>
        <p className="phone">Phone : {phone}</p>
      </div>
    </Link>
  );
};

export default JobCard;
