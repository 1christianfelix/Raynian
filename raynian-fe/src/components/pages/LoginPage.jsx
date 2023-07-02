import { FaEye, FaEyeSlash, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { motion } from "framer-motion";
import validator from "validator";
import raynian_logo_thin from "../../assets/thin_logo.svg";

function LoginPage() {
  const [togglePassword, setTogglePassword] = useState("password");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const handleTogglePassword = () => {
    if (togglePassword === "password") setTogglePassword("text");
    else setTogglePassword("password");
  };

  const validateEmail = (email) => {
    if (validator.isEmail(email)) setEmail(email);
    else setEmail("");
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
      setErrorMsg("Invalid Credentials");
    }
  };

  const fetchAuthUser = async () => {
    try {
      // sending credentials to send cookies
      const res = await fetch("http://localhost:4000/api/auth/login/success", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      // parse the JSON from the response
      const data = await res.json();
      console.log(data);
      dispatch(setCredentials({ ...data }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    // console.log(res);
  };

  const handleGoogleAuthClick = async (e) => {
    // Redirect the user to Google authentication
    let timer = null;
    const newWindow = window.open(
      "http://localhost:4000/api/auth/google",
      "_blank",
      "width=500,height=600"
    );

    // wait until pop out window closes and extract infor mation
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  const emailUsernameAnimation =
    user.length || email.length ? { y: -15, fontSize: "12px" } : "";
  const emailUsernameTransition =
    user.length || email.length ? { type: "stiff", stiffness: 100 } : "";
  const passwordAnimation = password.length ? { y: -15, fontSize: "12px" } : "";
  const passwordTransition = password.length
    ? { type: "stiff", stiffness: 100 }
    : "";

  return (
    <div
      className="py-10 flex flex-row bg-white w-[475px] rounded-3xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="pl-[60px] pr-[60px] w-full mx-auto mb-0 overflow-visible  h-[400px] flex items-center">
          <div className="w-full max-w-[960px] mx-auto mt-0 mb-0">
            <div className="flex flex-col items-center">
              <h1 className="text-[51px] mb-[20px] font-thin">Welcome Back!</h1>
              <img src={raynian_logo_thin} className="w-[50px] h-[50px]" />
              <h1 className="text-[51px]">Welcome Back!</h1>
                    {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
              <div className="w-full flex flex-col items-center max-w-[400px]">
                <div className="flex w-full flex-col">
                  <div>
                    {/* Form */}
                    <form onSubmit={submitHandler}>
                      <div className="w-full mt-[25px]">
                        <motion.p
                          className="absolute text-gray-400 pointer-events-none"
                          animate={emailUsernameAnimation}
                          transition={emailUsernameTransition}
                        >
                          Username or Email
                        </motion.p>
                        <input
                          type="text"
                          value={user}
                          // placeholder="Username or Email"
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => {
                            setUser(e.target.value);
                            validateEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <div className="w-full mt-[25px] flex">
                          <motion.p
                            className="absolute text-gray-400 pointer-events-none"
                            animate={passwordAnimation}
                            transition={passwordTransition}
                          >
                            Password
                          </motion.p>
                          <input
                            type={togglePassword}
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
                          disabled={!user || !password}
                        >
                          Sign in
                        </button>
                      </div>
                      <div
                        className="flex"
                        style={{ justifyContent: "center" }}
                      >
                        <p>Don't have an account?</p>{" "}
                        {/* Convert to a link that opens up the signup modal*/}
                      </div>
                    </form>

                    <div className="text-center border-b border-black leading-[0.1em] mt-[20px] mb-[20px] bg-inherit">
                      <span className="pl-[10px] pr-[10px] bg-white">or</span>
                    </div>

                    <div
                      className="flex mt-[20px] text-[14px]"
                      style={{ justifyContent: "space-between" }}
                    >
                      <motion.button
                        className="bg-white w-[49%] h-[40px] rounded-[4px] mb-[5px] border border-gray-300"
                        whileHover={{
                          backgroundColor: "whitesmoke",
                        }}
                      >
                        {" "}
                        <div
                          className="flex justify-center items-center"
                          onClick={handleGoogleAuthClick}
                        >
                          <FcGoogle className="mr-[5px] text-[16px]" />
                          <p className="font-normal">Sign in with Google</p>
                        </div>
                      </motion.button>
                      <motion.button
                        className="bg-white w-[49%] h-[40px] rounded-[4px] mb-[5px] border border-gray-300"
                        whileHover={{
                          backgroundColor: "whitesmoke",
                        }}
                      >
                        {" "}
                        <div className="flex justify-center items-center">
                          <FaApple className="mr-[5px] text-[16px]" />
                          <p className="font-normal">Sign in with Apple</p>
                        </div>
                      </motion.button>
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
