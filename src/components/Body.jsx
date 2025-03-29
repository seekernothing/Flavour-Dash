import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/constants";
import { useState } from "react";

const Body = () => {
  let [resData, setResdata] = useState(resObj);

  let ratingFiltering = () => {
    let filteredData = resData.filter((res) => res.data.avgRating > 4);
    setResdata(filteredData);
  };

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={ratingFiltering}>
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {resData.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
