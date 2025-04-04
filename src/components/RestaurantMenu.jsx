// // import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Shimmer from "./Shimmer";
// // import { MENU_API_URL } from "../utils/Cdn";
// import useRestaurantMenu from "../utils/useRestaurantMenu";

// const RestaurantMenu = () => {
//   // const [resMenu, setResmenu] = useState(null);
//   const { resId } = useParams();

//   const resMenu = useRestaurantMenu(resId);

//   // useEffect(() => {
//   //   fetchMenu();
//   // }, []);

//   // const fetchMenu = async () => {
//   //   try {
//   //     const data = await fetch(MENU_API_URL(resId));
//   //     const json = await data.json();
//   //     setResmenu(json);
//   //     console.log(json); // Debugging ke liye
//   //   } catch (error) {
//   //     console.error("Error fetching menu:", error);
//   //   }
//   // };

//   if (!resMenu) return <Shimmer />;

//   // ✅ Extract all cards
//   // const cards = resMenu?.data?.cards || [];
//   const cards = resMenu?.cards || [];

//   // ✅ Extract restaurant info card using @type
//   const restaurantInfoCard = cards.find(
//     (card) =>
//       card?.card?.card?.["@type"] ===
//       "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
//   );

//   const restaurantInfo = restaurantInfoCard?.card?.card?.info || {};
//   const { name, cuisines, costForTwoMessage } = restaurantInfo;

//   // ✅ Extract menu items from groupedCard REGULAR section
//   const regularCards =
//     resMenu?.data?.cards?.find(
//       (card) => card?.groupedCard?.cardGroupMap?.REGULAR
//     )?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

//   // ✅ Find first ItemCategory block (like "Recommended", "Rolls", etc.)
//   const itemCategoryCard = regularCards.find(
//     (card) =>
//       card?.card?.card?.["@type"] ===
//       "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
//   );

//   const itemCards = itemCategoryCard?.card?.card?.itemCards || [];

//   return (
//     <div className="menu">
//       <h1>{name || "Restaurant Name Not Found"}</h1>
//       <h3>{cuisines?.join(", ") || "Cuisines not available"}</h3>
//       <h4>{costForTwoMessage || "Price not available"}</h4>

//       <h2>Menu</h2>
//       <ul>
//         {itemCards.map((item, index) => (
//           <li key={item?.card?.info?.id || index}>
//             {item?.card?.info?.name} - ₹{item?.card?.info?.price / 100}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RestaurantMenu;


import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resMenu = useRestaurantMenu(resId);

  if (!resMenu) return <Shimmer />;

  const cards = resMenu?.cards || [];

  // Get Restaurant Info
  const restaurantInfoCard = cards.find(
    (card) =>
      card?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );
  const restaurantInfo = restaurantInfoCard?.card?.card?.info || {};
  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  // Get REGULAR section safely
  const regularCardSection =
    cards.find((card) => card?.groupedCard?.cardGroupMap?.REGULAR)?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards || [];

  // Get ALL itemCategories (Recommended, Desserts etc.)
  const allItemCategories = regularCardSection.filter(
    (card) =>
      card?.card?.card["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>{cuisines?.join(", ")}</h3>
      <h4>{costForTwoMessage}</h4>

      <h2>Menu</h2>

      {allItemCategories.map((category) => (
        <div key={category.card.card.title}>
          <h3>{category.card.card.title}</h3>
          <ul>
            {category.card.card.itemCards?.map((item) => (
              <li key={item.card.info.id}>
                {item.card.info.name} - ₹
                {(item.card.info.price || item.card.info.defaultPrice) / 100}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
