import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
const { REACT_APP_API_ENDPOINT } = process.env;

export const UsersContext = createContext();

export const UsersProvider = (props) => {
    const [user,setUser] = useContext(UserContext);
  const [users, setUsers] = useState(undefined);
  useEffect(() => {
      console.log(user)
      axios
        .get(`${REACT_APP_API_ENDPOINT}/user/all/${user}`,{}, { withCredentials: true })
        .then((res) => {
            setUsers(res.data);
        })
        .catch((err) => {
          setUsers(undefined);
        });
        console.log(users);
  }, []);

  return <UsersContext.Provider value={[users, setUsers]}>{props.children}</UsersContext.Provider>;
};
