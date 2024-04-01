import React, { useState, useEffect } from "react";
import Pricing from "./Pricing";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/reducers/themeSlice";

const PricingContainer = () => {
  const isDarkMode = useSelector((state) => state.themeReducer.isDarkMode);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BUILD == "PRODUCTION"
            ? "/api"
            : import.meta.env.VITE_BACKEND_URL
        }/investo/all`
      );
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    fetchData()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.className = "dark-theme";
    } else {
      document.documentElement.className = "light-theme";
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className="pricingContainer flex-wrap">
      <h1 className="heroText">Simple, traffic-based pricing</h1>
      <br />
      <p className="heroPara">
        Sign-up for our 30-day trial. No credit card required
      </p>
      <br />
      <div className="flex justify-evenly flex-nowrap toggle">
        <p>Light Mode</p>&nbsp;&nbsp;
        <div
          className={`toggle-container ${isDarkMode ? "toggled" : ""}`}
          onClick={handleToggle}
        >
          <div className="toggle-button"></div>
        </div>
        &nbsp;&nbsp;
        <p>Dark Mode</p>
      </div>
      <br />
      <br />
      <br />
      <div className="flex justify-center items-center flex-wrap gap-10">
        {data.map((item, index) => {
          return <Pricing key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default PricingContainer;
