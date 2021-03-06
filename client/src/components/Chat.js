import { useContext } from "react";
import Message from "./Message";
import Inputbar from "./Inputbar";
import { UserContext } from "../Context/UserContext";
const Chat = ({ id, chat }) => {
  const [user, setUser] = useContext(UserContext);
  return (
    <div className="flex flex-col w-full max-w-3xl flex-1 min-h-0 px-1">
      <div className="overflow-auto scroll flex flex-1 flex-col-reverse overflow-x-hidden">
        {chat &&
          chat
            .slice()
            .reverse()
            .map((message, index) => {
              return (
                <Message
                  message={message}
                  ownMessage={user.username === message.from}
                  key={index}
                >
                  {message.content}
                </Message>
              );
            })}
        {chat.length === 0 && (
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-current "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <h1 className="text-center text-xl font-roboto">
              Type your first message!
            </h1>
          </div>
        )}
      </div>
      <Inputbar id={id}></Inputbar>
    </div>
  );
};

export default Chat;
