// React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { FaEye, FaEyeSlash, FaApple, BiRefresh } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiRefreshCcw } from "react-icons/fi";

// Helpers
import { generateUser } from "../../helpers/generateUser";
import { checkUsernameDuplicate } from "../../helpers/usernameDuplicate";
import { checkEmailDuplicate } from "../../helpers/emailDuplicate";

// Others
import { motion } from "framer-motion";
import validator from "validator";

// --------------------

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [togglePassword, setTogglePassword] = useState("password");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState({});
  const [dupUserCheck, setDupUserCheck] = useState({});
  const [dupEmailCheck, setDupEmailCheck] = useState({});

  const [signup, { isLoading }] = useSignupMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  // Generate username logic
  const generateUserName = () => {
    setUsername(generateUser());
  };

  // Toggle password seen or unseen
  const handleTogglePassword = () => {
    if (togglePassword === "password") setTogglePassword("text");
    else setTogglePassword("password");
  };

  // check for username Duplicates and username invalidation throwing
  const handleUserDuplicate = async (user) => {
    const data = await checkUsernameDuplicate(user);
    setDupUserCheck(data);
  };
  // Check for email duplicates and set with error validations
  const handleEmailDuplicate = async (email) => {
    const data = await checkEmailDuplicate(email)
    setDupEmailCheck(data)
  }


  // Validate password Error
  const validatePassword = (password) => {
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordError(
        "Password requires at least one capital letter, number, and symbol"
      );
    } else {
      setPasswordError("");
    }
  };

  // Submit handler for form
  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors({});
    setEmailError("");

    if (password === confirmPassword) {
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
        setErrors(err.data);
      }
    }
  };

  // Framer Motion Placeholder Input Animations
  const usernameMotion = {};
  const emailMotion = {};
  const passwordMotion = {};
  const confirmPasswordMotion = {};
  if (username.length) {
    usernameMotion.animation = { y: -15, fontSize: "12px" };
    usernameMotion.transition = { type: "stiff", stiffness: 100 };
  }

  if (email.length) {
    emailMotion.animation = { y: -15, fontSize: "12px" };
    emailMotion.transition = { type: "stiff", stiffness: 100 };
  }

  if (password.length) {
    passwordMotion.animation = { y: -15, fontSize: "12px" };
    passwordMotion.transition = { type: "stiff", stiffness: 100 };
  }

  if (confirmPassword.length) {
    confirmPasswordMotion.animation = { y: -15, fontSize: "12px" };
    confirmPasswordMotion.transition = { type: "stiff", stiffness: 100 };
  }

  return (
    <div
      className="py-10 flex flex-row bg-white w-[475px] rounded-3xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="pl-[60px] pr-[60px] w-full mx-auto mb-0 overflow-visible">
        <div className="w-full">
          <div className="w-full max-w-[960px] mx-auto mt-0 mb-0">
            <div className="flex flex-col items-center">
              <h1 className="text-[51px] mb-[20px] font-light">Sign Up</h1>
              <div className="w-full flex flex-col items-center max-w-[400px]">
                <div className="flex w-full flex-col">
                  <div>
                    {errors && (
                      <p className="text-red-500 mb-[20px] text-center">
                        {errors.error}
                      </p>
                    )}
                    {/* Form */}
                    <form onSubmit={submitHandler}>
                      <div className="w-full">
                        <motion.p
                          className="absolute text-gray-400 pointer-events-none"
                          animate={usernameMotion.animation}
                          transition={usernameMotion.transition}
                        >
                          Username
                        </motion.p>
                        <div className="flex flex-row">
                          <input
                            type="text"
                            value={username}
                            className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                            onChange={(e) => {
                              setUsername(e.target.value);
                              handleUserDuplicate(e.target.value);
                            }}
                            // onBlur={(e) => checkUsernameDuplicate(e.target.value)}
                          />
                          <FiRefreshCcw
                            className="ml-[-25px] cursor-pointer"
                            size={20}
                            id="togglePassword"
                            onClick={() => generateUserName()}
                          />
                        </div>
                      </div>
                      {dupUserCheck && dupUserCheck.error ? (
                        <p className="text-green-500 text-[12px] absolute">
                          {dupUserCheck.msg}
                        </p>
                      ) : (
                        <p className="text-red-500 text-[12px] absolute">
                          {dupUserCheck.msg}
                        </p>
                      )}
                      <div className="w-full mt-[35px]">
                        <motion.p
                          className="absolute text-gray-400 pointer-events-none"
                          animate={emailMotion.animation}
                          transition={emailMotion.transition}
                        >
                          Email
                        </motion.p>
                        <input
                          type="text"
                          value={email}
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => {
                            setEmail(e.target.value);
                            // validateEmail(e.target.value);
                            handleEmailDuplicate(e.target.value)
                          }}
                        />
                        {dupEmailCheck.error ? <p className="text-green-500 text-[12px] absolute">{dupEmailCheck.msg}</p> : <p className="text-red-500 text-[12px] absolute">{dupEmailCheck.msg}</p>}
                      </div>
                      <div>
                        <div className="w-full mt-[35px] flex">
                          <motion.p
                            className="absolute text-gray-400 pointer-events-none"
                            animate={passwordMotion.animation}
                            transition={passwordMotion.transition}
                          >
                            Password
                          </motion.p>
                          <input
                            type={togglePassword}
                            value={password}
                            className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                            onChange={(e) => {
                              setPassword(e.target.value);
                              validatePassword(e.target.value);
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
                        {password.length !== 0 && passwordError && (
                          <p className="text-red-500 text-[12px] absolute">
                            {passwordError}
                          </p>
                        )}
                      </div>

                      <div className="w-full mt-[35px]">
                        <motion.p
                          className="absolute text-gray-400 pointer-events-none"
                          animate={confirmPasswordMotion.animation}
                          transition={confirmPasswordMotion.transition}
                        >
                          Confirm Password
                        </motion.p>
                        <input
                          type={togglePassword}
                          value={confirmPassword}
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPassword.length !== 0 &&
                          password != confirmPassword && (
                            <p className="text-red-500 p-[0] text-[12px] absolute">
                              Password do not match
                            </p>
                          )}
                      </div>
                      <div className="flex justify-center mt-[25px]">
                        <button
                          className="bg-sky-500 w-full h-[40px] rounded-[4px] mb-[5px] disabled:bg-red-200 disabled:text-white"
                          disabled={
                            password !== confirmPassword ||
                            !password ||
                            !confirmPassword ||
                            username.length < 4 ||
                            username.length > 25
                          }
                        >
                          Sign up
                        </button>
                      </div>
                      <div
                        className="flex"
                        style={{ justifyContent: "center" }}
                      >
                        <p>Already have an account?</p>{" "}
                        {/* Convert to a link that opens up the login modal*/}
                      </div>
                    </form>

                    <div className="text-center border-b border-black leading-[0.1em] mt-[20px] mb-[20px] bg-inherit">
                      <span
                        // style={{
                        //   background: "#ffe4e6 var(--tw-gradient-to-position)",
                        // }}
                        className="pl-[10px] pr-[10px] bg-white"
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
