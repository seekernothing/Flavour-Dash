import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [resData, setResData] = useState([]);
  const [filteredres, setFilteredres] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return <h1>Looks like you are offline. check your internet connection</h1>;

  return resData.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex justify-center">
        <div className="searchbox-container  m-2 p-2 ">
          <input
            className="searchbox border-solid border-black"
            type="text"
            placeholder="Search restaurants...."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn mr-1 bg-green-400 px-4 rounded-xl cursor-pointer ml-2"
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
        <div className="flex items-center">
          {" "}
          <button
            className="filter-btn mr-1  px-4 rounded-xl cursor-pointer ml-2 bg-gray-200"
            onClick={ratingFiltering}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      <div className="res-container flex flex-wrap justify-center">
        {filteredres.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {" "}
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
