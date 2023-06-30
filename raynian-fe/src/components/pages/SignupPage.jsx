import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { FaEye, FaEyeSlash, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
function SignupPage() {
  const [togglePassword, setTogglePassword] = useState("password");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  });

  const handleTogglePassword = () => {
    if (togglePassword === "password") setTogglePassword("text");
    else setTogglePassword("password");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    try {
      const res = await signup({
        email,
        username,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-10 flex flex-row bg-white">
      <div className="pl-[60px] pr-[60px] w-full mx-auto mb-0 overflow-visible">
        <div className="w-full">
          <div className="w-full max-w-[960px] mx-auto mt-0 mb-0">
            <div className="flex flex-col items-center">
              <h1 className="text-[64px] mb-[30px]">Sign Up</h1>

              <div className="w-full flex flex-col items-center max-w-[400px]">
                <div className="flex w-full flex-col">
                  <div>
                    {/* Form */}
                    <form onSubmit={submitHandler}>
                      <div className="w-full mb-[30px]">
                        <input
                          type="text"
                          value={username}
                          placeholder="Username"
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="w-full mb-[30px]">
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="w-full mb-[30px] flex">
                        <input
                          type={togglePassword}
                          placeholder="Password"
                          value={password}
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {togglePassword === "text" ? (
                          <FaEyeSlash
                            className="ml-[-25px] cursor-pointer"
                            size={20}
                            id="togglePassword"
                            onClick={() => handleTogglePassword()}
                          />
                        ) : (
                          <FaEye
                            className="ml-[-25px] cursor-pointer"
                            size={20}
                            id="togglePassword"
                            onClick={() => handleTogglePassword()}
                          />
                        )}
                      </div>
                      <div className="w-full mb-[20px]">
                        <input
                          type={togglePassword}
                          value={confirmPassword}
                          placeholder="Confirm Password"
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-center mt-[15px]">
                        <button
                          className="bg-sky-500 w-full h-[40px] rounded-[4px] mb-[5px] disabled:bg-red-500 disabled:text-white"
                          disabled={password !== confirmPassword}
                        >
                          Sign up
                        </button>
                      </div>
                      <div
                        className="flex"
                        style={{ justifyContent: "center" }}
                      >
                        <p>Already have an account?</p>
                      </div>
                    </form>

                    <div className="text-center border-b border-black leading-[0.1em] mt-[20px] mb-[20px] bg-inherit">
                      <span
                        style={{
                          background: "#ffe4e6 var(--tw-gradient-to-position)",
                        }}
                        className="pl-[10px] pr-[10px]"
                      >
                        or
                      </span>
                    </div>

                    <div
                      className="flex mt-[20px] text-[14px]"
                      style={{ justifyContent: "space-between" }}
                    >
                      <button className="bg-white w-[49%] h-[40px] rounded-[4px] mb-[5px] border border-gray-300">
                        {" "}
                        <div className="flex justify-center items-center">
                          <FcGoogle className="mr-[5px] text-[16px]" />
                          <p className="font-normal">Continue with Google</p>
                        </div>
                      </button>
                      <button className="bg-white w-[49%] h-[40px] rounded-[4px] mb-[5px] border border-gray-300">
                        {" "}
                        <div className="flex justify-center items-center">
                          <FaApple className="mr-[5px] text-[16px]" />
                          <p className="font-normal">Continue with Apple</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
