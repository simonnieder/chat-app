import { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { SocketProvider } from "./Context/SocketContext";
import { UserContext, UserProvider } from "./Context/UserContext";
import Routes from "./Routes";
function App() {
  return (
    <div className="App antialiased">
      <UserProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
