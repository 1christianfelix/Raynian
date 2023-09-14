import { FaEye, FaEyeSlash, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApi";
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

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
    }
  }, [userInfo, navigate]);

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
    <div className="flex w-[475px] flex-row rounded-3xl bg-white py-10">
      <div className="mx-auto mb-0 flex h-[400px] w-full items-center  overflow-visible px-[60px]">
        <div className="mx-auto my-0 w-full max-w-[960px]">
          <div className="flex flex-col items-center">
            <img
              src={raynian_logo_thin}
              className="h-[50px] w-[50px]"
              alt="raynian logo"
            />
            <h1 className="text-[51px]">Welcome Back!</h1>
            {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
            <div className="flex w-full max-w-[400px] flex-col items-center">
              <div className="flex w-full flex-col">
                <div>
                  {/* Form */}
                  <form onSubmit={submitHandler}>
                    <div className="mt-[25px] w-full">
                      <motion.p
                        className="pointer-events-none absolute text-gray-400"
                        animate={emailUsernameAnimation}
                        transition={emailUsernameTransition}
                      >
                        Username or Email
                      </motion.p>
                      <input
                        type="text"
                        value={user}
                        // placeholder="Username or Email"
                        className="w-full border-b-[1px] border-black bg-inherit pb-[3px] focus:outline-none"
                        onChange={(e) => {
                          setUser(e.target.value);
                          validateEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <div className="mt-[25px] flex w-full">
                        <motion.p
                          className="pointer-events-none absolute text-gray-400"
                          animate={passwordAnimation}
                          transition={passwordTransition}
                        >
                          Password
                        </motion.p>
                        <input
                          type={togglePassword}
                          value={password}
                          className="w-full border-b-[1px] border-black bg-inherit pb-[3px] focus:outline-none"
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
                    <div className="mt-[15px] flex justify-center">
                      <button
                        className="mb-[5px] h-[40px] w-full rounded-[4px] bg-sky-500 disabled:bg-red-200 disabled:text-white"
                        disabled={!user || !password}
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="flex" style={{ justifyContent: "center" }}>
                      <p>Don't have an account?</p>{" "}
                      {/* Convert to a link that opens up the signup modal*/}
                    </div>
                  </form>

                  <div className="my-[20px] border-b border-black bg-inherit text-center leading-[0.1em]">
                    <span className="bg-white px-[10px]">or</span>
                  </div>

                  <div
                    className="mt-[20px] flex text-[14px]"
                    style={{ justifyContent: "space-between" }}
                  >
                    <motion.button
                      className="mb-[5px] h-[40px] w-[49%] rounded-[4px] border border-gray-300 bg-white"
                      whileHover={{
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      {" "}
                      <div
                        className="flex items-center justify-center"
                        onClick={handleGoogleAuthClick}
                      >
                        <FcGoogle className="mr-[5px] text-[16px]" />
                        <p className="font-normal">Sign in with Google</p>
                      </div>
                    </motion.button>
                    <motion.button
                      className="mb-[5px] h-[40px] w-[49%] rounded-[4px] border border-gray-300 bg-white"
                      whileHover={{
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      {" "}
                      <div className="flex items-center justify-center">
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
