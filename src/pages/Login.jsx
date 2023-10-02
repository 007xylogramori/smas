import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleOnChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      alert("ENTER VALID CREDENTIALS");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/", {
        state: { useremail: localStorage.getItem("userEmail") },
      });
    }
  };

  return (
    <div className="w-[100%] min-h-[100vh] flex justify-center items-center">
      <div className="loginContainer rounded-md w-[100%] shadow-xl max-w-[450px] min-h-[400px] px-4  mx-4 text-black flex justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className="w-[100%] max-w-[250px] flex flex-col gap-2 my-3"
        >
          <div className="flex w-[100%] flex-col">
            <label htmlFor="exampleInputEmail1" className="form-label ">
              Email address
            </label>
            <input
              name="email"
              value={credentials.email}
              onChange={handleOnChange}
              type="email"
              className="outline-blue-800 form-control  border-2 border-black rounded-md py-1"
              id="InputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="flex flex-col mb-1">
            <label htmlFor="InputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={credentials.password}
              onChange={handleOnChange}
              type="password"
              className="form-control  border-black border-2 rounded-md py-1"
              id="InputPassword1"
            />
          </div>

          <button
            type="submit"
            className="btn mt-2 text-lg fw-bold border-4 rounded-md border-blue-800 hover:bg-blue-900  py-1 text-white bg-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
