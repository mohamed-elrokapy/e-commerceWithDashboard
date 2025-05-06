import React, { useState, useContext, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import appcontext from "../context/appcontext";

export default function Login() {
  const { setisloggedin } = useContext(appcontext);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState({});
  const navigate = useNavigate();

  const validation = () => {
    let newerrors = {};

    const emailvalidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const useremail = user.email.trim();
    if (useremail == "") {
      newerrors.email = `Please enter your email`;
    } else if (!emailvalidation.test(useremail)) {
      newerrors.email = `Invalid email format`;
    }

    const userpassword = user.password.trim();
    if (userpassword == "") {
      newerrors.password = `Please enter your password`;
    }

    seterror(newerrors);
    return Object.keys(newerrors).length === 0;
  };

  const handlingformsubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      const userdata = { ...user };
      try {
        const response = await axios.get(
          "https://lime-horse-eyebrow.glitch.me/users"
        );
        const registereddata = response.data.find(
          (registereduser) =>
            registereduser.email === userdata.email &&
            registereduser.password === userdata.password
        );

        if (registereddata) {
          localStorage.setItem("postuserid", registereddata.id);
          setisloggedin(true);
          seterror({});
          navigate("/");
        } else {
          seterror({ general: "Invalid email or password" });
        }
      } catch (err) {
        console.error("Server error:", err);
        seterror({ general: "Server error, please try again" });
      }
    }
  };

  return (
    <section className="flex justify-center pt-24 items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full">
        <Typography
          variant="h3"
          color="blue-gray"
          className="  text-center p-5 mb-3 rounded-lg text-white text-3xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500  ">
          Sign In
        </Typography>
        <Typography className="text-gray-600 mb-8 text-lg font-normal text-center">
          Enter your email and password to sign in
          {error.general && (
            <span className="text-red-500 ml-3">{error.general}</span>
          )}
        </Typography>

        <form onSubmit={handlingformsubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-900 font-medium mb-2">
              Your Email
              {error.email && (
                <span className="text-red-500 ml-3">{error.email}</span>
              )}
            </label>
            <Input
              value={user.email}
              id="email"
              type="email"
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              placeholder="name@mail.com"
              className="w-full text-lg border-gray-300  rounded-md "
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-900 font-medium mb-2">
              Password
              {error.password && (
                <span className="text-red-500 ml-3">{error.password}</span>
              )}
            </label>
            <Input
              value={user.password}
              id="password"
              type={passwordShown ? "text" : "password"}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              placeholder="********"
              className="w-full text-lg border-gray-300  rounded-md"
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                  )}
                </i>
              }
            />
          </div>

          <Button
            color="indigo"
            size="lg"
            fullWidth
            type="submit"
            className="mt-6 text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
            Sign In
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="text-center mt-4 font-medium text-gray-600">
            Not registered?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}
