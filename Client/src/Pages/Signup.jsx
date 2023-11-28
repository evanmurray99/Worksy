/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import studentImg from "../assets/students.jpg";
import hireImg from "../assets/hirers.jpg";
import axios from "axios";

// Function to check if the email is valid for a student or non-student
const isValidEmail = (email, isStudent) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (isStudent) {
    return email.endsWith("@myumanitoba.ca") && emailRegex.test(email);
  } else {
    return emailRegex.test(email);
  }
};

// Function to handle form submission
export const signUp = async (
  firstName,
  lastName,
  email,
  isStudent,
  password
) => {
  try {
    const url = "http://localhost:3001/api/users/";
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      isStudent: isStudent,
      password: password,
    };
    return await axios
      .post(url, body)
      .then((response) => response.data)
      .catch((e) => e.response.data);
  } catch (e) {
    console.log("Error occured", e.message);
  }
};

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    //check if passwords match before sending to backend
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    //check if email is valid before sending to backend
    if (!isValidEmail(email, isStudent)) {
      setError("Must use a student email!");
      return;
    }

    const data = await signUp(firstName, lastName, email, isStudent, password);

    try {
      if (data.message) {
        setError(data.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setError("An error occurred while registering");
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="justify-center items-center flex max-h-screen overflow-y-none">
      <div className="justify-center items-center flex  max-h-screen">
        <div className="flex flex-col justify-center items-center rounded-xl p-20 shadow-xl max-h-screen overflow-y-none my-10">
          <p className="uppercase text-2xl font-bold hidden sm:block my-2">
            Are you a student or looking to hire students?
          </p>
          <div className="flex flex-row justify-center items-center">
            <div
              id="student"
              className={`flex flex-col justify-center items-center mx-5 ${
                isStudent
                  ? "border-4 border-black rounded-md font-bold bg-blue"
                  : ""
              }`}
              onClick={() => setIsStudent(true)}
            >
              <div>Student</div>
              <img src={studentImg} className="object-contain h-24 w-24"></img>
            </div>
            <div
              id="client"
              className={`flex flex-col justify-center items-center mx-5 ${
                !isStudent
                  ? "border-4 border-black rounded-md font-bold bg-blue"
                  : ""
              }`}
              onClick={() => setIsStudent(false)}
            >
              <div>Client</div>
              <img src={hireImg} className="object-contain h-24 w-24" />
            </div>
          </div>
          <form
            className="bg-white max-w-[500px] w-full mx-5"
            onSubmit={handleSubmit}
            onKeyDown={handleEnter}
          >
            <div className="text-center py-3 text-gray-700">
              <h1 className="text-2xl font-bold mb-4 uppercase">Sign up</h1>
              <p>Welcome to Worksy</p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col py-1">
                <label htmlFor="email">First name</label>
                <input
                  className="border p-1 focus:outline-gray-400 "
                  type="text"
                  id="firstname"
                  required={true}
                  value={firstName}
                  placeholder="First name"
                  onChange={(event) => {
                    setFirstName(event.target.value);
                    setError(null);
                  }}
                />
              </div>
              <div className="flex flex-col py-1">
                <label htmlFor="email">Last name</label>
                <input
                  className="border p-2 focus:outline-gray-400 "
                  type="text"
                  id="lastname"
                  required={true}
                  value={lastName}
                  placeholder="Last name"
                  onChange={(event) => {
                    setLastName(event.target.value);
                    setError(null);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="email">Email</label>
              <input
                className="border p-2 focus:outline-gray-400 "
                type="email"
                id="email"
                required={true}
                value={email}
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError(null);
                }}
              />
            </div>

            <div className="flex flex-col py-1">
              <label htmlFor="password">Password</label>
              <input
                className="border p-2 focus:outline-gray-400 "
                type="password"
                id="password"
                required={true}
                value={password}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(null);
                }}
              />
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="password">Re-type password</label>
              <input
                className="border p-2 focus:outline-gray-400 "
                type="password"
                id="password"
                required={true}
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setError(null);
                }}
              />
            </div>
            {error ? (
              <div className="text-white w-full bg-red-700 px-1 py-1 flex justify-center text-center bold rounded-lg">
                {error}
              </div>
            ) : null}
            {success ? (
              <div className="text-white w-full bg-green-700 px-1 py-1 flex justify-center text-center bold rounded-lg">
                Account created ! Redirecing to login
              </div>
            ) : null}
            <button className="border w-full my-5 py-2 bg-gray-700 hover:bg-gray-500  text-white">
              Create account
            </button>
            <Link
              className="flex justify-center hover:text-gray-500"
              to="/login"
            >
              Already have account? Sign in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
