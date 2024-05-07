import React, { useState, useEffect} from "react";
import JobCard from "./JobCard";

const JobList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(2);

  const fetchData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
          limit: 12,
          offset: `${index}0`,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };

        fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setItems((prevItems) => [...prevItems, ...result?.jdList]))
          .catch((error) => console.error(error));
      } catch (error) {
        console.log(error);
      } finally {
        setIndex((prevIndex) => prevIndex + 1);
        setIsLoading(false);
      }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        console.log(scrollTop + clientHeight , scrollHeight - 20);
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
          limit: 12,
          offset: 0,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };

        fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setItems(result?.jdList))
          .catch((error) => console.error(error));
      } catch (error) {
        console.log(error);
      }finally{
         setIsLoading(false);
      }
     
    };

    getData();
  }, []);
  
  return (
    <>
      <div className="cardList">
          {items.map((res, index) => (
            <JobCard key={index}></JobCard>
          ))}
      </div>
      <div >{isLoading && <div >Loading...</div>}</div>
    </>
  );
};

export default JobList;