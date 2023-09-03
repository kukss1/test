import React, { useState, useEffect, useMemo } from "react";

export const Context = React.createContext();

export const ContextStore = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  // useEffect(() => {
  //   if (userData) {
  //     localStorage.setItem("userData", JSON.stringify(userData));
  //   }
  // }, [userData]);

  useEffect(() => {
    if (!userData) {
      fetch(`/auth/getUser`)
        .then((res) => res.json())
        .then((res) => {
          setUserData(res.user);
        });
    }
  }, []);

  const providerValue = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData]
  );

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
