import React, { useState } from "react";
import XSvg from "../../../components/svgs/XSvg";
import { MdDriveFileRenameOutline, MdOutlineEmail, MdPassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formData);
  }

  const handleInputChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const isError = false;
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col" onSubmit={handleSubmit}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xxl font-extrabold text-white">Join Today.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineEmail />
            <input
              type="email"
              name="email"
              className="grow"
              placeholder="Email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <FaUser />
            <input
              type="text"
              name="username"
              className="grow"
              placeholder="Username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdDriveFileRenameOutline/>
            <input
              type="text"
              name="fullName"
              className="grow"
              placeholder="Full Name"
              onChange={handleInputChange}
              value={formData.fullName}
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>

          <button className="btn rounded-full btn-primary text-white">Sign up</button>
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account ?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
