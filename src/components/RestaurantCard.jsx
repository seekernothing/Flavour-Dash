import { CDN_URL } from "../utils/Cdn";
let RestaurantCard = (props) => {
  const { resData } = props;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={CDN_URL + resData.data.cloudinaryImageId} // Corrected path
        alt="Biryani"
      />

      <h2>{resData.data.name}</h2>
      <h4>{resData.data.cuisines.join(", ")}</h4>
      <h4>{resData.data.avgRating} stars</h4>
      <h4>₹{resData.data.costForTwo / 100} For two </h4>
      <h4>{resData.data.deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
