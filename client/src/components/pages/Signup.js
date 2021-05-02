import axios from "axios"
import { useContext, useState } from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import Button from "../Button"
import Input from "../Input"
const { REACT_APP_API_ENDPOINT } = process.env;
const Signup = () => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: "",
        error: "",
    })

    const onSubmit = (e)=>{
        e.preventDefault();
        setForm({...form, error: ""});
        if(form.password !== form.confirmPassword) return setForm({...form, error: "Passwords don't match!"});
        axios.post(`${REACT_APP_API_ENDPOINT}/user/signup`,form, { withCredentials: true }).then(res=>{
            setUser(res.data.username);
            history.push("/");
        }).catch((err)=>{
            if(!err.response) return setForm({...form, error: "Server not reachable!"});
            setForm({...form, error: "Username already taken!"});
        })
    }


    if(user){
        return <Redirect to="/"></Redirect>
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-300">
            <div className="bg-white flex flex-col items-center max-w-md p-10 rounded-2xl space-y-2 w-full">
                <h1 className="text-3xl text-gray-800 font-roboto font-medium ">Create your account!</h1>
                <p className="text-lg text-gray-800 font-roboto ">Already have an account? <Link to="/login" className="text-primary-blue underline">Log in!</Link> </p>
                <form onSubmit={onSubmit} className="w-full space-y-2 flex flex-col items-center">
                    <Input title="First name" placeholder="Enter your first name" value={form.firstname} onChange={(value)=>setForm({...form, firstname: value})}></Input>
                    <Input title="Last name" placeholder="Enter your last name" value={form.lastname} onChange={(value)=>setForm({...form, lastname: value})}></Input>
                    <Input title="Username" placeholder="Enter your username" value={form.username} onChange={(value)=>setForm({...form, username: value})}></Input>
                    <Input title="Password" type="password" placeholder="Enter your password" value={form.password} onChange={(value)=>setForm({...form, password: value})}></Input>
                    <Input title="Confirm password" type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={(value)=>setForm({...form, confirmPassword: value})}></Input>
                    {form.error && <p className="font-inter font-normal text-red-500 text-md">{form.error}</p>}
                    <Button full primary>sign up</Button>
                </form>
            </div>
        </div>

    )
}

export default Signup
    