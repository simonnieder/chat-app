import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { SocketProvider } from "./Context/SocketContext";
import { UserProvider } from "./Context/UserContext";
function App() {

  return (
    <div className="App">
      <SocketProvider>
        <UserProvider>
          <BrowserRouter>
          <Switch>
            <Route path="/login" render={()=> <Login></Login>}></Route>
            <Route path="/signup" render={()=> <Signup></Signup>}></Route>
            <Route path={["/:id", "/" ]} render={(props)=> <Home {...props}></Home>}></Route>
          </Switch> 
          </BrowserRouter>
        </UserProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
