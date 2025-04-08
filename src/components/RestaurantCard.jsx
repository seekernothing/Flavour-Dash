import { CDN_URL } from "../utils/Cdn";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData.info;

  return (
    <div className="res-card m-4 p-4 w-[330px] bg-gray-400   hover:bg-gray-500 px-2 py-2 rounded-2xl transition-all delay-100 duration-300 ease-in-out ">
      <img
        className="res-logo rounded-xl mb-2"
        src={CDN_URL + cloudinaryImageId}
        alt="Restaurant Image"
      />
      <h2 className="font-bold py-3 text-3xl">{name}</h2>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime} minutes</h4>
    </div>
  );
};

//Higher order component:

// input-->restaurantcard
// output--> restaurantcardpromoted



export default RestaurantCard;
