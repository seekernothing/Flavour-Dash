import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [resData, setResData] = useState([]);
  const [filteredres, setFilteredres] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("mil gaya")

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();

      // Update this path according to the actual JSON structure
      const restaurants =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setResData(restaurants);
      setFilteredres(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const ratingFiltering = () => {
    const filteredData = resData.filter((res) => res.info.avgRating > 4);
    setResData(filteredData);
  };

  // if (resData.length === 0) {
  //   return <Shimmer />;
  // }

  return resData.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="searchbox-container">
          <input
            className="searchbox"
            type="text"
            placeholder="Search restaurants...."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              let filteredRes = resData.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredres(filteredRes);
            }}
          >
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={ratingFiltering}>
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {filteredres.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
