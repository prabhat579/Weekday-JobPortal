const JobCard = (props) => {
    const {cardDetails } = props
    const { companyName, logoUrl, minExp, location, jobDetailsFromCompany, minJdSalary, maxJdSalary} = cardDetails
    return (
      <>
        <div className="card">
          <div className="posted">
            <span className="postedDetails">⏳ Posted 5 Days Ago</span>
          </div>
          <div className="compDetails">
            <div className="card-img">
              <img
                src={logoUrl}
                alt="logo"
              />
            </div>
            <div>
              <div className="info-container">
                <h3>{companyName}</h3>
                <h2>Software Engineer</h2>
              </div>
              <span className="cards-sub-text">{location}</span>
            </div>
          </div>
          <span className="est-sal">Estimated Salary: ₹{minJdSalary} - {maxJdSalary} LPA ✅</span>
          <p className="about-Comp">About Company:</p>
          <div className="about">
            <span>
              <strong>About Us</strong>
            </span>
            <p>
              {jobDetailsFromCompany}
            </p>
          </div>
          <div className="viewJob">
            <a>View job</a>
          </div>
          <div className="info-container">
            <h3>Minimum Experience</h3>
            <h2>{minExp} years</h2>
          </div>
        </div>
      </>
    );
  };
  
  export default JobCard;
  