import { useState } from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
function SignupPage() {

    const [togglePassword, setTogglePassword] = useState('password')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
            value={username}
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-[50px]">
          <input
            type="email"
            value={email}
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Section */}
        <div className="mb-[50px] flex ml-[-6px]">
          <input
            type={togglePassword}
            value={password}
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {
            togglePassword === 'text' ? <FaEyeSlash className="ml-[-25px] cursor-pointer" size={20} id="togglePassword" onClick={() => handleTogglePassword()}/> :
            <FaEye className="ml-[-25px] cursor-pointer" size={20} id="togglePassword" onClick={() => handleTogglePassword()}/>
          }
        </div>
        <div className="mb-[10px] flex]">
          <input
            type={togglePassword}
            value={confirmPassword}
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
