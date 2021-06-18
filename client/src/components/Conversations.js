import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/SocketContext";
import { UserContext } from "../Context/UserContext";
import User from "./User";
const { REACT_APP_API_ENDPOINT } = process.env;
const Conversations = ({ id, search, refresh }) => {
  const [defaultUsers, setDefaultUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  const [user] = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/user/conversations/${user.username}`)
      .then((res) => {
        setDefaultUsers(res.data);
        setFilteredUsers(res.data);
      });
  }, [refresh]);

  useEffect(() => {
    if (!socket) return;
    socket.on("user-state-change", (user) => {
      setDefaultUsers((users) => {
        if (!users) return [];
        const currentUser = users.find((u) => u.username === user.username);
        const returnUsers = users.filter((u) => u.username !== user.username);
        return [{ ...currentUser, online: user.online }, ...returnUsers];
      });
      setFilteredUsers((users) => {
        if (!users) return [];
        const currentUser = users.find((u) => u.username === user.username);
        const returnUsers = users.filter((u) => u.username !== user.username);
        return [{ ...currentUser, online: user.online }, ...returnUsers];
      });
    });
    return () => {
      socket.off("user-state-change");
    };
  }, [socket]);

  useEffect(() => {
    if (!defaultUsers) return;
    setFilteredUsers(
      defaultUsers.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="overflow-auto flex flex-1 flex-col overflow-x-hidden pb-1">
      {filteredUsers?.length > 0 ? (
        filteredUsers
          .sort((a, b) => b.id - a.id)
          .map((user) => (
            <User
              key={user.id}
              active={user.username === id}
              online={user.online}
              user={user}
            ></User>
          ))
      ) : (
        <p className="text-center text-blue-gray-700 font-roboto font-medium text-md ">
          No users found!
        </p>
      )}
    </div>
  );
};

export default Conversations;
