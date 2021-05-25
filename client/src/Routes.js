import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { SocketProvider } from "./Context/SocketContext";
import { UserContext } from "./Context/UserContext";
const Routes = () => {
    const [user] = useContext(UserContext);
    return (
        <>
        {user.loading ? 
            <Loader className="text-primary-blue h-9 w-9"></Loader> : 
            <Switch>
                <Route path="/login" render={()=> <Login></Login>}></Route>
                <Route path="/signup" render={()=> <Signup></Signup>}></Route>
                <SocketProvider>  
                <Route path={["/:id", "/" ]} render={(props)=> <Home {...props}></Home>}></Route>
                </SocketProvider>
            </Switch> 
        }
        </>
    )
}

export default Routes
