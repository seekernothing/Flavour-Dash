import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";

const Body = () => {
  const [resData, setResdata] = useState([]); // Full restaurant data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();

      console.log("Full API Response:", json);

      // Specifically check card 4 which has the restaurant data
      const restaurantCard = json?.data?.cards[4]?.card?.card;

      if (restaurantCard?.gridElements?.infoWithStyle?.restaurants) {
        const restaurants =
          restaurantCard.gridElements.infoWithStyle.restaurants;
        console.log("Found restaurants:", restaurants);
        setResdata(restaurants);
      } else {
        // As a fallback, search through all cards
        let foundRestaurants = false;
        for (let i = 0; i < json?.data?.cards?.length; i++) {
          const card = json?.data?.cards[i]?.card?.card;

          if (card?.gridElements?.infoWithStyle?.restaurants) {
            const restaurants = card.gridElements.infoWithStyle.restaurants;
            console.log("Found restaurants in card", i, restaurants);
            setResdata(restaurants);
            foundRestaurants = true;
            break;
          }
        }

        if (!foundRestaurants) {
          console.log("No restaurants found in any card");
          setError("Could not find restaurant data in API response");
        }
      }

      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
      setLoading(false);
    }
  };

  // Filter top-rated restaurants
  const ratingFiltering = () => {
    const filtered = resData.filter(
      (res) => parseFloat(res?.info?.avgRating) > 4
    );
    setResdata(filtered);
  };

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={ratingFiltering}>
          Top Rated Restaurants
        </button>
        {error && (
          <button className="filter-btn" onClick={fetchData}>
            Retry
          </button>
        )}
      </div>

      <div className="res-container">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : resData.length > 0 ? (
          resData.map((restaurant) => (
            <RestaurantCard
              key={restaurant?.info?.id || Math.random()}
              resData={restaurant}
            />
          ))
        ) : (
          <h2>No restaurants found</h2>
        )}
      </div>
    </div>
  );
};

export default Body;
