const JobCard = (props) => {
  const { cardDetails } = props;
  const {
    companyName,
    logoUrl,
    minExp,
    location,
    jobDetailsFromCompany,
    minJdSalary,
    maxJdSalary,
  } = cardDetails;
  
  // Provide default values for properties that might be null
  const defaultCompanyName = companyName || "Company Name";
  const defaultLogoUrl = logoUrl || "src/images/default-logo.png";
  const defaultLocation = location || "Location";
  const defaultJobDetails = jobDetailsFromCompany || "No details available";
  const defaultMinJdSalary = minJdSalary || "N/A";
  const defaultMaxJdSalary = maxJdSalary || "N/A";
  const defaultMinExp = minExp || "N/A";

  return (
    <>
      <div className="card">
        <div className="posted">
          <span className="postedDetails">⏳ Posted 5 Days Ago</span>
        </div>
        <div className="compDetails">
          <div className="card-img">
            <img src={defaultLogoUrl} alt="logo" />
          </div>
          <div>
            <div className="info-container">
              <h3>{defaultCompanyName}</h3>
              <h2>Software Engineer</h2>
            </div>
            <span className="cards-sub-text">{defaultLocation}</span>
          </div>
        </div>
        <span className="est-sal">
          Estimated Salary: ₹{defaultMinJdSalary} - {defaultMaxJdSalary} LPA ✅
        </span>
        <p className="about-Comp">About Company:</p>
        <div className="about">
          <span>
            <strong>About Us</strong>
          </span>
          <p>{defaultJobDetails}</p>
        </div>
        <div className="viewJob">
          <a>View job</a>
        </div>
        <div className="info-container">
          <h3>Minimum Experience</h3>
          <h2>{defaultMinExp} years</h2>
        </div>
      </div>
    </>
  );
};

export default JobCard;
