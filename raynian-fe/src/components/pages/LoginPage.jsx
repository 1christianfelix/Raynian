import { FaEye, FaEyeSlash, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";

function LoginPage() {
  const [togglePassword, setTogglePassword] = useState("password");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

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
    const username = user.includes("@") ? null : user;
    const email = user.includes("@") ? user : null;
    console.log(username, email, password);
    try {
      const res = await login({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="py-10 flex flex-row bg-white w-[475px] rounded-3xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="pl-[60px] pr-[60px] w-full mx-auto mb-0 overflow-visible">
        <div className="w-full">
          <div className="w-full max-w-[960px] mx-auto mt-0 mb-0">
            <div className="flex flex-col items-center">
              <h1 className="text-[51px] mb-[20px] font-light">Welcome Back!</h1>

              <div className="w-full flex flex-col items-center max-w-[400px]">
                <div className="flex w-full flex-col">
                  <div>
                    {/* Form */}
                    <form onSubmit={submitHandler}>
                      <div className="w-full">
                        <input
                          type="text"
                          value={user}
                          placeholder="Username or Email"
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => setUser(e.target.value)}
                        />
                      </div>
                      <div>
                        <div className="w-full mt-[15px] flex">
                          <input
                            type={togglePassword}
                            placeholder="Password"
                            value={password}
                            className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                            onChange={(e) => {
                              setPassword(e.target.value);

                            }}
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
                      </div>
                      <div className="flex justify-center mt-[15px]">
                        <button
                          className="bg-sky-500 w-full h-[40px] rounded-[4px] mb-[5px] disabled:bg-red-200 disabled:text-white"
                          disabled={''}
                        >
                          Sign up
                        </button>
                      </div>
                      <div
                        className="flex"
                        style={{ justifyContent: "center" }}
                      >
                        <p>Don't have an account?</p>
                      </div>
                    </form>

                    <div className="text-center border-b border-black leading-[0.1em] mt-[20px] mb-[20px] bg-inherit">
                      <span className="pl-[10px] pr-[10px] bg-white">or</span>
                    </div>

                    <div
                      className="flex mt-[20px] text-[14px]"
                      style={{ justifyContent: "space-between" }}
                    >
                      <button className="bg-white w-[49%] h-[40px] rounded-[4px] mb-[5px] border border-gray-300">
                        {" "}
                        <div className="flex justify-center items-center">
                          <FcGoogle className="mr-[5px] text-[16px]" />
                          <p className="font-normal">Sign in with Google</p>
                        </div>
                      </button>
                      <button className="bg-white w-[49%] h-[40px] rounded-[4px] mb-[5px] border border-gray-300">
                        {" "}
                        <div className="flex justify-center items-center">
                          <FaApple className="mr-[5px] text-[16px]" />
                          <p className="font-normal">Sign in with Apple</p>
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

export default LoginPage;
