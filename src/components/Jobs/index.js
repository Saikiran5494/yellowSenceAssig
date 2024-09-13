import { Component } from "react";
import Loader from "react-loader-spinner";

import JobCard from "../JobCard";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    currentPage: 1,
  };

  componentDidMount() {
    this.getJobsList();
  }

  getJobsList = async () => {
    const { currentPage } = this.state;
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const url = `https://testapi.getlokalapp.com/common/jobs?page=${currentPage}`;
    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);

    if (response.ok === true) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.results.map((result) => ({
        title: result.title,
        location: result.job_location_slug,
        phone: result.whatsapp_no,
        id: result.id,
        salaryMin: result.salary_min,
        salaryMax: result.salary_max,
        openings: result.openings_count,
        hours: result.job_hours,
      }));

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  oneClicked = () => {
    this.setState({ currentPage: 1 }, this.getJobsList);
  };

  twoClicked = () => {
    this.setState({ currentPage: 2 }, this.getJobsList);
  };

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderAllJobsView = () => {
    const { jobsList, currentPage } = this.state;
    return (
      <ul className="jobs-list">
        {jobsList.map((job) => (
          <JobCard jobData={job} key={job.id} currentPage={currentPage} />
        ))}
      </ul>
    );
  };

  renderSuccessView = () => {
    const { jobsList, apiStatus } = this.state;
    const count = jobsList.length;
    return (
      <div className="jobs-container">
        <div className="heading-search-container">
          <h2>Pick a best job for you out of jobs({count})</h2>
        </div>
        <hr className="line" />
        {apiStatus === "IN_PROGRESS"
          ? this.renderLoadingView()
          : this.renderAllJobsView()}
        <button type="button" onClick={this.oneClicked}>
          1
        </button>
        <button type="button" onClick={this.twoClicked}>
          2
        </button>
      </div>
    );
  };

  render() {
    const { apiStatus } = this.state;
    return apiStatus === "FAILURE"
      ? this.renderFailureView()
      : this.renderSuccessView();
  }
}

export default Jobs;
