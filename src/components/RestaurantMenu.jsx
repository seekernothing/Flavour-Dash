import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_API_URL } from "../utils/Cdn";

const RestaurantMenu = () => {
  const [resMenu, setResmenu] = useState(null);

  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API_URL(resId));
      const json = await data.json();
      setResmenu(json);
      console.log(json); // Debugging ke liye
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  if (!resMenu) return <Shimmer />; // Loader jab tak data na aaye

  // ✅ **Safe destructuring**
  const restaurantInfo = resMenu?.data?.cards?.[2]?.card?.card?.info || {};
  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  // ✅ **Safe itemCards extraction**
  const itemCardInfo =
    resMenu?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]
      ?.card?.card || {};

  const itemCards = itemCardInfo.itemCards || [];

  return (
    <div className="menu">
      <h1>{name || "Restaurant Name Not Found"}</h1>
      <h3>{cuisines?.join(", ") || "Cuisines not available"}</h3>
      <h4>{costForTwoMessage || "Price not available"}</h4>

      <h2>Menu</h2>
      <ul>
        {itemCards.map((item, index) => (
          <li key={item?.card?.info?.id || index}>
            {item?.card?.info?.name} - ₹{item?.card?.info?.price / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
