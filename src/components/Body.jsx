import RestaurantCard from "./RestaurantCard";

import resObj from "../utils/constants";




let Body = () => {
  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={()=>{}}>Top Rated Restaurants</button>
      </div>
      <div className="res-container">
        {resObj.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}

        {/* <RestaurantCard
          resName="KFC"
          cusine="Burger, Fries,Fast food"
          ratings="4.1 stars"
          deliverytime="20 minutes"
        /> */}
      </div>
    </div>
  );
};

export default Body;
