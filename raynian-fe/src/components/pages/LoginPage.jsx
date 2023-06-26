import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function LoginPage() {

  const [togglePassword, setTogglePassword] = useState('password')

    const handleTogglePassword = () => {
        if (togglePassword === 'password') setTogglePassword('text')
        else setTogglePassword('password')
    }

  return (
    <div className="w-screen mt-[80px]">
      <form action="" className="flex flex-col items-center">
        <h1 className="text-6xl mb-[50px]">Login</h1>
        {/* Username and Email Section */}
        <div className="mb-[50px]">
          <input
            type="text"
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Username or Email"
          />
        </div>
        {/* Password Section */}
        <div className="mb-[10px] flex ml-[-6px]">
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
      <div>
        {/* Save Password Checkbox */}
        <div className="mb-[5px] mt-[10px]">
          <input type="checkbox" />
          <span className="ml-[5px]">Save Password</span>
        </div>

        {/* Forgot Password and Sign up for Raynian */}
        <div className="flex space-x-36">
          <p>Forgot Password?</p>
          <p>Sign up for Raynian</p>
        </div>
      </div>
      </form>
    </div>
  );
}

export default LoginPage;
