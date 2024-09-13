import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "react-loader-spinner";
import "./index.css";

class SpecificJobDetails extends Component {
  state = { jobDetails: [], page: 1, loader: false, error: false };

  componentDidMount() {
    this.getSpecificJob();
  }

  getFormmatedData = (result) => ({
    id: result.id,
    qualification: result.qualification,
    advertiser: result.advertiser,
    cityLocation: result.city_location,
    comapanyName: result.company_name,
    contactPreference: result.contact_preference,
    createdOn: result.created_on,
    expiresOn: result.expire_on,
    fbShares: result.fb_shares,
    jobCatergory: result.job_category,
    jobCatergoryId: result.job_category_id,
    jobHours: result.job_hours,
    jobLocatonSlug: result.job_location_slug,
    jobRole: result.job_role,
    numApplications: result.num_applications,
    openingsCount: result.openings_count,
    primaryDetails: result.primary_details,
    views: result.views,
    whatsappNo: result.whatsapp_no,
    title: result.title,
    salaryMin: result.salary_min,
    salaryMax: result.salary_max,
    feesCharged: result.fees_charged,
    hr: result.button_text,
  });

  getSpecificJob = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const { page } = this.state;
    this.setState({ loader: true });

    const url = `https://testapi.getlokalapp.com/common/jobs/?page=${page}`;
    const response = await fetch(url);

    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.results.map((each) =>
        this.getFormmatedData(each)
      );

      let show = updatedData.filter((each) => each.id === parseInt(id));
      if (show.length === 0) {
        this.setState({ page: 2 }, this.getSpecificJob);
      } else {
        this.setState({ jobDetails: show[0] });
        this.setState({ loader: false });
      }
    } else {
      this.setState({ error: true });
    }
  };

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderSuccessView = () => {
    const { jobDetails, loader } = this.state;
    const {
      title,
      feesCharged,
      comapanyName,
      jobCatergory,
      jobCatergoryId,
      jobRole,
      jobLocatonSlug,
      createdOn,
      expiresOn,
      hr,
      openingsCount,
      jobHours,
      salaryMin,
      salaryMax,
      numApplications,
      views,
      fbShares,
      advertiser,
      whatsappNo,
      qualification,
    } = jobDetails;
    return loader ? (
      this.renderLoadingView()
    ) : (
      <div className="bg-container">
        <div className="title-company-name-cont">
          <h1 className="title2">{title}</h1>
          <p className="com-name">Comapany Name : {comapanyName}</p>
        </div>
        <p className="job-category">Job Category : {jobCatergory}</p>
        <p className="job-category">ID : {jobCatergoryId}</p>
        <div className="details-card">
          <h1 className="role">Role : {jobRole}</h1>
          <p className="location2">Location : {jobLocatonSlug}</p>
          <p className="openings_count">Openings : {openingsCount}</p>
          <p className="job-type">Job-Type : {jobHours}</p>
          <p className="job-type">Qualification : {qualification}</p>
          <p>Fees Charged : {feesCharged}</p>
          <p className="job-type">
            Salary : {salaryMin} - {salaryMax}
          </p>
          <p className="job-type">
            No.of applications Recieved : {numApplications}
          </p>
          <p className="job-type">Views : {views}</p>
          <p className="job-type">Shares : {fbShares}</p>
          <p className="job-type">Contact Person : {hr}</p>
          <p className="job-type">Contact No. : {whatsappNo}</p>
          <p className="date">Created On : {createdOn}</p>
          <p className="date">Expires On : {expiresOn}</p>
          <p className="date">Advertiser : {advertiser}</p>
        </div>
        <Link to="/jobs">
          <button type="button" className="back">
            Back
          </button>
        </Link>
      </div>
    );
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

  render() {
    const { error } = this.state;
    return error ? this.renderFailureView() : this.renderSuccessView();
  }
}

export default SpecificJobDetails;
