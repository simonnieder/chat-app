import { useContext, useEffect, useState } from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import Button from "../Button"
import Input from "../Input"
import axios from "axios"
import { UserContext } from "../../Context/UserContext"
const { REACT_APP_API_ENDPOINT } = process.env;
const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const [form, setForm] = useState({
        username: "",
        password: "",
        error:"",
    })

    const onSubmit = (e)=>{
        e.preventDefault();
        setForm({...form, error: ""});
        axios.post(`${REACT_APP_API_ENDPOINT}/user/login`,form, { withCredentials: true }).then(res=>{
            setUser(res.data.username);
            history.push("/");
        }).catch((err)=>{
            if(!err.response) return setForm({...form, error: "Server not reachable!"});
            setForm({...form, error: "Username or password incorrect!"});
        })
    }


    if(user){
        return <Redirect to="/"></Redirect>
    }
    return (
        <div className="w-full h-screen flex items-center justify-center bg-blue-gray-100">
            <form onSubmit={onSubmit} className="bg-white flex flex-col items-center max-w-md p-10 rounded-lg space-y-2 w-full">
                <h1 className="text-3xl text-blue-gray-800 font-roboto font-medium text-center ">Log in to account!</h1>
                <h1 className="text-lg text-blue-gray-700 font-roboto ">No account? <Link to="/signup" className="text-primary-blue underline">Sign up!</Link> </h1>
                <Input required full value={form.username} onChange={(value)=> setForm({...form, username: value})} title="Username" placeholder="Enter your name"></Input>
                <Input required full value={form.password} onChange={(value)=> setForm({...form, password: value})} title="Password" type="password" placeholder="Enter your password"></Input>
                {form.error && <p className="font-inter font-normal text-red-500 text-md">{form.error}</p>}
                <Button full primary>login</Button>
            </form>
        </div>

    )
}

export default Login
    