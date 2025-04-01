import { CDN_URL } from "../utils/Cdn";

const RestaurantCard = (props) => {
  const { resData } = props;

  // Debug log to see the structure
  console.log("Restaurant Data in Card:", resData);

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={CDN_URL + resData.info.cloudinaryImageId}
        alt={resData.info.name}
      />

      <h2>{resData.info.name}</h2>
      <h4>{resData.info.cuisines.join(", ")}</h4>
      <h4>{resData.info.avgRating} stars</h4>
      <h4>{resData.info.costForTwo}</h4>
      <h4>{resData.info.sla.deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
