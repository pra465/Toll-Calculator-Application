import React from 'react';
import { useSelector } from 'react-redux';
import './TripCost.css';
const TripCost = () => {
  const tripCost = useSelector((state) => state.tollCost.cost);
  console.log(tripCost);
  return (
    <div id="tripCostContainer">
      <h1 className="tripCostHeading">Your Trip Cost 🌍🚘</h1>
      <p>
        Fuel: {tripCost?.costs?.fuel} | Distance: {tripCost.distance.metric}
      </p>
    </div>
  );
};

export default TripCost;
