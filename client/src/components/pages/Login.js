import { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import InputError from "../InputError";
const { REACT_APP_API_ENDPOINT } = process.env;
const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
    error: "",
    loading: false,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setForm({ ...form, error: "", loading: true });
    axios
      .post(`${REACT_APP_API_ENDPOINT}/user/login`, form, {
        withCredentials: true,
      })
      .then((res) => {
        setUser({ username: res.data.username, loading: false });
      })
      .catch((err) => {
        if (!err.response)
          return setForm({ ...form, error: "Server not reachable!" });
        setForm({ ...form, error: err.response.data.error, loading: false });
      });
  };

  if (user.username) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white flex flex-col items-center max-w-md p-10 rounded-lg space-y-2 w-full shadow-md"
      >
        <h1 className="text-3xl text-blue-gray-800 font-roboto font-medium text-center ">
          Log in to account!
        </h1>
        <h1 className="text-lg text-blue-gray-700 font-roboto ">
          No account?{" "}
          <Link to="/signup" className="text-primary-blue underline">
            Sign up!
          </Link>{" "}
        </h1>
        <Input
          required
          full
          value={form.username}
          onChange={(value) => setForm({ ...form, username: value })}
          title="Username"
          placeholder="Enter your name"
        ></Input>
        <Input
          required
          full
          value={form.password}
          onChange={(value) => setForm({ ...form, password: value })}
          title="Password"
          type="password"
          placeholder="Enter your password"
        ></Input>
        {form.error && <InputError msg={form.error}></InputError>}
        <Button primary full loading={form.loading}>
          login
        </Button>
      </form>
    </div>
  );
};

export default Login;
