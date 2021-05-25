import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({
    username : undefined,
    loading: false,
  });
  useEffect(() => {
    if (document.cookie.split("; ").find((row) => row.startsWith("connect.sid="))) {
      setUser({username: undefined, loading: true});
      axios
        .post(`${REACT_APP_API_ENDPOINT}/user/login`,{}, { withCredentials: true })
        .then((res) => {
            setUser({username: res.data.username, loading: false});
        })
        .catch((err) => {
          setUser({username: undefined, loading: false});
        });
    }
  }, []);

  return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};
