import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    if (document.cookie.split("; ").find((row) => row.startsWith("connect.sid="))) {
      axios
        .post(`${REACT_APP_API_ENDPOINT}/user/login`,{}, { withCredentials: true })
        .then((res) => {
            setUser(res.data.username);
        })
        .catch((err) => {
          setUser(undefined);
        });
    }
  }, []);

  return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};
