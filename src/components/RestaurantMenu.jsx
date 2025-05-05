import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { CDN_URL, MENU_API_URL } from "../utils/CDN"; // 

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/CartSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resMenu = useRestaurantMenu(resId);
  const dispatch = useDispatch();
  const [expandedIndex, setExpandedIndex] = useState(null); //  For accordion

  if (!resMenu) return <Shimmer />;

  const cards = resMenu?.cards || [];

  const restaurantInfoCard = cards.find(
    (card) =>
      card?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );
  const restaurantInfo = restaurantInfoCard?.card?.card?.info || {};
  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  const regularCardSection =
    cards.find((card) => card?.groupedCard?.cardGroupMap?.REGULAR)?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards || [];

  const allItemCategories = regularCardSection.filter(
    (card) =>
      card?.card?.card["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  const toggleCategory = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAddItem = (item) => {
    dispatch(addItems(item));
  };

  return (
    <div className="text-center">
      <div>
        <h1 className="text-2xl font-extrabold my-10 underline">{name}</h1>
        <p className="font-bold text-lg">{cuisines?.join(", ")}</p>
        <h4>{costForTwoMessage}</h4>
        <h2 className="my-4 text-xl font-bold">Menu</h2>
      </div>

      {allItemCategories.map((category, index) => (
        <div
          key={category.card.card.title}
          className="bg-gray-50 shadow-lg p-4 w-6/12 mx-auto my-4 rounded-xl"
        >
          {/* Title Row */}
          <div
            className="flex justify-between cursor-pointer font-bold text-left"
            onClick={() => toggleCategory(index)}
          >
            <span>
              {category.card.card.title} ({category.card.card.itemCards.length})
            </span>
            <span>{expandedIndex === index ? "⬆️" : "⬇️"}</span>
          </div>

          {/* Accordion Content */}
          {expandedIndex === index && (
            <ul className="mt-4">
              {category.card.card.itemCards?.map((item) => (
                <li
                  className="p-2 m-2 border-black border-b-2 text-left"
                  key={item.card.info.id}
                >
                  <div className="flex p-2">
                    <div>
                      <img
                        className="w-30 rounded-2xl"
                        src={CDN_URL + item.card.info.imageId}
                        alt={item.card.info.name}
                      />
                    </div>
                    <div className="mt-5 p-6">
                      <span className="px-2 font-bold">
                        {item.card.info.name}
                      </span>
                      <span>
                        - ₹
                        {(item.card.info.price || item.card.info.defaultPrice) /
                          100}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs">{item.card.info.description}</p>
                  <span>
                    <button
                      onClick={() => handleAddItem(item)}
                      className="mt-4 rounded-2xl p-3 bg-yellow-200 font-bold cursor-default hover:cursor-pointer"
                    >
                      Add to Cart +
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
