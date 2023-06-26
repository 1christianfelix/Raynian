import { useState } from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
function SignupPage() {

    const [togglePassword, setTogglePassword] = useState('password')

    const handleTogglePassword = () => {

        if (togglePassword === 'password') setTogglePassword('text')
        else setTogglePassword('password')
    }

  return (
    <div className="w-screen mt-[20px]">
      <form action="" className="flex flex-col items-center">
        <h1 className="text-6xl mb-[50px]">Sign Up</h1>
        {/* Username and Email Section */}
        <div className="mb-[50px]">
          <input
            type="text"
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Username"
          />
        </div>
        <div className="mb-[50px]">
          <input
            type="email"
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Email"
          />
        </div>

        {/* Password Section */}
        <div className="mb-[50px] flex ml-[-6px]">
          <input
            type={togglePassword}
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Password"
          />
          {
            togglePassword === 'text' ? <FaEyeSlash className="ml-[-25px] cursor-pointer" size={20} id="togglePassword" onClick={() => handleTogglePassword()}/> :
            <FaEye className="ml-[-25px] cursor-pointer" size={20} id="togglePassword" onClick={() => handleTogglePassword()}/>
          }
        </div>
        <div className="mb-[10px] flex ml-[-6px]">
          <input
            type={togglePassword}
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Confirm Password"
          />
        </div>

        <div className="">
          {/* Check boxes */}
          <div className="mb-[5px] mt-[10px] flex space-x-16">
            <div>
              <input type="checkbox" />
              <span className="ml-[5px]">Terms of Agreement</span>
            </div>
            <p>Already have an account?</p>
          </div>
          <div className="mb-[5px] mt-[10px]">
            <input type="checkbox" />
            <span className="ml-[5px]">Subscribe to newsletter</span>
          </div>

          {/* Signup Button */}
          <button className="bg-gray-300 w-[100px] rounded-[3px]">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
