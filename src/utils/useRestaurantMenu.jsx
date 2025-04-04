// import { useEffect, useState } from "react";

// import { MENU_API_URL } from "./Cdn";

// const useRestaurantMenu = (resId) => {
//   const [resMenu, setResmenu] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, [resId]);

//   const fetchData = async () => {
//     const data = await fetch(MENU_API_URL(resId));
//     const json = await data.json();
//     console.log(json);
//     setResmenu(json.data)
//   };

//   return resMenu;
// };

// export default useRestaurantMenu;


import { useEffect, useState } from "react";
import { MENU_API_URL } from "./Cdn";

const useRestaurantMenu = (resId) => {
  const [resMenu, setResmenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(MENU_API_URL(resId));
        const json = await data.json();
        console.log(json); // debug
        setResmenu(json.data);
      } catch (error) {
        console.error("Error fetching restaurant menu:", error);
      }
    };

    if (resId) fetchData();
  }, [resId]); // ✅ Add resId as dependency

  return resMenu;
};

export default useRestaurantMenu;
