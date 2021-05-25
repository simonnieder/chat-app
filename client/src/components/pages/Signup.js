import axios from "axios"
import { useContext, useState } from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import Button from "../Button"
import Input from "../Input"
import InputError from "../InputError"
const { REACT_APP_API_ENDPOINT } = process.env;
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const Signup = () => {
    const [user, setUser] = useContext(UserContext);
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
    })

    const onSubmit = (e)=>{
        e.preventDefault();
        setForm({...form, error: ""});
        if(!EMAIL_REGEX.test(form.email.toLowerCase())) return setForm({...form, error: "Enter a valid email!"});
        if(form.password.length < 8) return setForm({...form, error: "Password too short. Use at least 8 characters"});
        if(form.password !== form.confirmPassword) return setForm({...form, error: "Passwords don't match!"});
        axios.post(`${REACT_APP_API_ENDPOINT}/user/signup`,form, { withCredentials: true }).then(res=>{
            setUser({username: res.data, loading: false});
        }).catch((err)=>{
            if(!err.response) return setForm({...form, error: "Server not reachable!"});
            setForm({...form, error: err.response.data.error});
        })
    }


    if(user.username){
        return <Redirect to="/"></Redirect>
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-blue-gray-100">
            <div className="bg-white flex flex-col items-center max-w-md p-10 rounded-2xl space-y-2 w-full shadow-md">
                <h1 className="text-3xl text-blue-gray-800 font-roboto font-medium text-center ">Create your account!</h1>
                <p className="text-lg text-blue-gray-700 font-roboto text-center ">Already have an account? <Link to="/login" className="text-primary-blue underline">Log in!</Link> </p>
                <form onSubmit={onSubmit} className="w-full space-y-2 flex flex-col items-center">
                    <Input required full title="Username" placeholder="Enter your username" value={form.username} onChange={(value)=>setForm({...form, username: value, error:""})}></Input>
                    <Input required full title="Email" placeholder="Enter your Email" value={form.email} onChange={(value)=>setForm({...form, email: value, error:""})}></Input>
                    <Input required full title="Password" type="password" placeholder="Enter your password" value={form.password} onChange={(value)=>setForm({...form, password: value, error:""})}></Input>
                    <Input required full title="Confirm password" type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={(value)=>setForm({...form, confirmPassword: value, error:""})}></Input>
                    {form.error && <InputError msg={form.error}></InputError>}
                    <Button full primary>sign up</Button>
                </form>
            </div>
        </div>

    )
}

export default Signup
    