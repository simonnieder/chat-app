import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const UsersContext = createContext();

export const UsersProvider = (props) => {
  const [users, setUsers] = useState(undefined);
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/user/all`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        setUsers(undefined);
      });
  }, []);

  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
