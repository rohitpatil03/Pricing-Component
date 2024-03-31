import React, { useState } from "react";
import check from "../assets/icon-check.svg";

const props = {
  reviews: "100K PAGEVIEWS",
  initialPrice: 16,
  range: { min: 0, max: 100 },
  toggleSwitch: {
    left: { name: "Monthly", value: 0, discount: false },
    right: { name: "Yearly", value: 25, discount: true },
    multiplier: 12,
  },
  policy: [
    { id: 1, data: "Unlimited websites" },
    { id: 2, data: "100% data ownership" },
    { id: 3, data: "Email reports" },
  ],
};
const Pricing = () => {
  const [price, setPrice] = useState(props.initialPrice);
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
    if (isToggled) {
      const newPrice =
        price /
        ((100 - props.toggleSwitch.right.value) * 0.01) /
        props.toggleSwitch.multiplier;
      setPrice(newPrice.toFixed(2));
    } else {
      const newPrice = (
        price *
        props.toggleSwitch.multiplier *
        (100 - props.toggleSwitch.right.value) *
        0.01
      ).toFixed(2);
      setPrice(newPrice);
    }
  };

  const handleSliderChange = (event) => {
    setPrice(Number(event.target.value).toFixed(2));
  };

  return (
    <>
      <div className="pricing rounded-md">
        <div className="flex justify-evenly items-center flex-wrap">
          <h3>{props.reviews}</h3>
          <div className="flex justify-center items-center gap-1 flex-wrap">
            <p className="text-4xl priceTag">${price}</p>
            <p>
              {" "}
              /{" "}
              {isToggled
                ? props.toggleSwitch.right.name
                : props.toggleSwitch.left.name}
            </p>
          </div>
        </div>
        <br />
        <div className="flex justify-evenly flex-wrap">
          <input
            type="range"
            min={props.range.min}
            max={
              !isToggled
                ? props.range.max
                : props.range.max * props.toggleSwitch.multiplier
            }
            value={price}
            onChange={handleSliderChange}
            className="slider"
          />
        </div>
        <br />
        <br />
        <div className="flex justify-evenly flex-nowrap toggle">
          {/* {props.toggleSwitch.left.discount?<p>{props.toggleSwitch.left.value}</p>:<p>{props.toggleSwitch.left.value}</p>} */}
          <p>{props.toggleSwitch.left.name}</p>

          <div
            className={`toggle-container ${isToggled ? "toggled" : ""}`}
            onClick={handleToggle}
          >
            <div className="toggle-button"></div>
          </div>
          <div className="flex flex-nowrap w-24 justify-between items-center">
            <p>{props.toggleSwitch.right.name}</p>
            {props.toggleSwitch.right.discount ? (
              <p className="discount rounded-md flex justify-center items-center">
                -{props.toggleSwitch.right.value}%
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className="flex justify-evenly flex-wrap">
          <div>
            {props.policy.map((info) => {
              return (
                <div key={info.id} className="flex gap-3">
                  <img src={check} alt="" className="w-5" />
                  <p>{info.data}</p>
                </div>
              );
            })}
          </div>
          <button className="btn">Start Trail</button>
        </div>
      </div>
    </>
  );
};

export default Pricing;
