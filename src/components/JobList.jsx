import React, { useState, useEffect, useRef, useCallback } from "react";
import JobCard from "./JobCard";
import Select from "react-select";
import { API_URL, ROLES, LOCATION, EXPERIENCE } from "../enum/constants";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(1);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [totalJobs, setTotalJobs] = useState(null);
  const [noJobs, setNoJobs] = useState(false);

  // function to call get jobs data
  const fetchData = (data = "") => {
    if (isLoading) return;
    const numIndex = parseInt(index + "0");
    console.log(data);
    if (totalJobs && numIndex > totalJobs && data != "NoData") {
      return;
    }
    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      //  data variable use when there is no data for filter and user remove filters then jobs will show from start with offset 0
      const body = JSON.stringify({
        limit: 12,
        offset: data ? "12" : `${index}2`,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      fetch(API_URL, requestOptions)
        .then((response) => response.json())
        .then(
          (result) => (
            //  data variable use when there is no data for filter and user remove filters then jobs will show from start with offset 0
            setJobs((prevJobs) => (data === "NoData" ? result?.jdList : [...prevJobs, ...result?.jdList])),
            setFilterItems((prevItems) => (data === "NoData" ? result?.jdList : [...prevItems, ...result?.jdList])),
            setTotalJobs(result?.totalCount),
            setIsLoading(false),
            setIndex((prevIndex) => prevIndex + 1)
          )
        )
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      //fetchData function call only when scroll reach at bottom
      if (
        window.innerHeight + document.documentElement.scrollTop + 20 >=
          document.documentElement.offsetHeight &&
        !isLoading
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    // handle memory leakage
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  // Call only once while after loaded html first time
  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions);
  };

  const handleExpChange = (selectedOptions) => {
    setSelectedExperience(selectedOptions);
  };

  const handleLocationChange = (selectedOptions) => {
    setSelectedLocations(selectedOptions);
  };

  const filterJobs = React.useCallback(() => {
    // after remove all filter job list showing from start of the list
    if (
      selectedRoles.length === 0 &&
      selectedExperience.length == 0 &&
      selectedLocations.length == 0 &&
      filterItems.length == 0
    ) {
      fetchData("NoData");
    }
    const filteredJobs = jobs.filter((job) => {
      const roleFilter =
        selectedRoles.length === 0 ||
        selectedRoles.some((role) => job.jobRole.includes(role.value));
      const experienceFilter =
        selectedExperience.length === 0 ||
        selectedExperience.some((exp) => job.minExp === exp.value);
      const locationFilter =
        selectedLocations.length === 0 ||
        selectedLocations.some((location) => {
          if (location.value === "office" || location.value === "hybrid") {
            return job.location !== "remote";
          }
          return job.location === location.value;
        });
      return roleFilter && experienceFilter && locationFilter;
    });
    return filteredJobs;
  }, [jobs, selectedRoles, selectedExperience, selectedLocations]);

  useEffect(() => {
    const numIndex = parseInt(index + "0");
    const filteredJobs = filterJobs();
    // when filter jobs count is less than 12 call api once again and also handle total job count for not exceed numIndex
    if (filteredJobs.length < 12 && numIndex >= totalJobs && jobs.length != 0) {
      // handle case for no data for added filter
      if (filteredJobs.length == 0) {
        alert("No jobs for this filter!");
        setFilterItems([]);
        setJobs([]);
        setIndex(1);
        // to show no jobs message
        setNoJobs(true);
      } else {
        // when offset (numIndex) reached to total jobs count below alert will popup
        alert("No more jobs to load!");
        setIndex(1);
      }
      return;
    } else if (filteredJobs.length < 12 && jobs.length != 0) {
      fetchData();
      return;
    }
    if (jobs.length > 0) {
      setNoJobs(false);
      setFilterItems(filteredJobs);
    }
  }, [filterJobs, index, jobs]);

  return (
    <>
      <div className="filter-options">
        <Select
          defaultValue={[]}
          value={selectedRoles}
          placeholder="Roles"
          isMulti
          options={ROLES}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleRoleChange}
        />
        <Select
          defaultValue={[]}
          value={selectedExperience}
          placeholder="Experience"
          isMulti
          options={EXPERIENCE}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleExpChange}
        />
        <Select
          defaultValue={[]}
          value={selectedLocations}
          placeholder="Office Type"
          isMulti
          options={LOCATION}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleLocationChange}
        />
      </div>

      <div className="cardList">
        {filterItems.map((res, index) => (
           <JobCard key={index} cardDetails={res}></JobCard>
        ))}
      </div>

      <div>{noJobs && <div>No Jobs</div>}</div>
    </>
  );
};

export default JobList;
