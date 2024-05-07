const JobCard = () => {
    return (
      <>
        <div className="card">
          <div className="posted">
            <span className="postedDetails">⏳ Posted 5 Days Ago</span>
          </div>
          <div className="compDetails">
            <div className="card-img">
              <img
                src="https://storage.googleapis.com/weekday-assets/airtableAttachment_1713598322273_sjxlt.jpg"
                alt=""
              />
            </div>
            <div>
              <div className="info-container">
                <h3>Ema</h3>
                <h2>Software Engineer</h2>
              </div>
              <span className="cards-sub-text">Banglore</span>
            </div>
          </div>
          <span className="est-sal">Estimated Salary: ₹30 - 60 LPA ✅</span>
          <p className="about-Comp">About Company:</p>
          <div className="about">
            <span>
              <strong>About Us</strong>
            </span>
            <p>
              Flex Wash is an operating system for the car wash industry. Our
              solutions help owners manage their operations and grow revenue. Our
              POS has a built-in CRM, allowing car washes to take advantage of
              their customer transaction history in order to funnel customers into
              subscriptions and higher margin wash packages.. Founder/Recruiter
              profiles: Chirag Singh Toor
            </p>
          </div>
          <div className="viewJob">
            <a>View job</a>
          </div>
          <div className="info-container">
            <h3>Minimum Experience</h3>
            <h2>4 years</h2>
          </div>
        </div>
      </>
    );
  };
  
  export default JobCard;