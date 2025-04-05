import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  // check if online

  const [onlineStatus, setOnlinestatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlinestatus(false);
    });
    window.addEventListener("online", () => {
      setOnlinestatus(true);
    });
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
