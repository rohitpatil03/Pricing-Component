import React, { useState, useEffect } from "react";
import Pricing from "./Pricing";
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/reducers/themeSlice';

const PricingContainer = () => {
  const isDarkMode = useSelector((state) => state.themeReducer.isDarkMode);
  const dispatch = useDispatch();
  

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
        </div>&nbsp;&nbsp;
        <p>Dark Mode</p>
      </div>
      <br />
      <br />
      <br />
      <Pricing />
    </div>
  );
};

export default PricingContainer;
