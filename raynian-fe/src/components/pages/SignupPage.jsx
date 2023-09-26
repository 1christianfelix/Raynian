// React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../../slices/usersApi";
import { setCredentials } from "../../slices/authSlice";
import { FaEye, FaEyeSlash, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiRefreshCcw } from "react-icons/fi";

// Helpers
import { generateUniqueUser } from "../../helpers/generateUser";
import { checkUsernameDuplicate } from "../../helpers/usernameDuplicate";
import { checkEmailDuplicate } from "../../helpers/emailDuplicate";
import CloseModalButton from "../util/CloseModalButton";

// Others
import { motion } from "framer-motion";
import validator from "validator";

// --------------------

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // useStates
  const [togglePassword, setTogglePassword] = useState("password");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // error useStates
  const [passwordError, setPasswordError] = useState("");
  const [requiredPassword, setRequiredPassword] = useState("");
  const [requiredConfirmPassword, setRequiredConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [errors, setErrors] = useState({});
  const [dupUserCheck, setDupUserCheck] = useState({});
  const [dupEmailCheck, setDupEmailCheck] = useState({});

  // slices
  const [signup] = useSignupMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  // Generate username logic
  const generateUserName = async () => {
    setUsername(await generateUniqueUser());
    setDupUserCheck({
      msg: "Username available",
      valid_display: true,
      error: true,
    }); // Always will be unique as this is checked in the backend
  };

  // Toggle password seen or unseen
  const handleTogglePassword = () => {
    if (togglePassword === "password") setTogglePassword("text");
    else setTogglePassword("password");
  };

  // Set Password required Error
  const handleRequiredPasswordError = (password) => {
    if (password.length === 0) {
      setRequiredPassword("Password Required");
    }
  };

  // Set Confirm Password required Error
  const handleRequiredConfirmPasswordError = (confirmPassword) => {
    if (confirmPassword.length === 0) {
      setRequiredConfirmPassword("Password Required");
    }
  };

  // Set password must match error
  const handlePasswordMatch = (confirmPassword) => {
    if (confirmPassword !== password) {
      setPasswordMatchError("Password must match");
    }
    if (confirmPassword.length === 0) {
      setPasswordMatchError("Password required");
    }
  };

  // check for username Duplicates and username invalidation throwing
  const handleUserDuplicate = async (user) => {
    const data = await checkUsernameDuplicate(user);
    setDupUserCheck(data);
  };
  // Check for email duplicates and set with error validations
  const handleEmailDuplicate = async (email) => {
    const data = await checkEmailDuplicate(email);
    setDupEmailCheck(data);
  };

  // Validate password Error
  const handleValidatePassword = (password) => {
    if (password.length < 8 && password.length > 0) {
      setPasswordError("Password requires at least 8 characters");
      return;
    }
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
      className="relative flex w-[475px] flex-row rounded-3xl bg-white py-10"
      onClick={(event) => event.stopPropagation()}
    >
      <CloseModalButton />
      <div className="mx-auto mb-0 w-full overflow-visible px-[60px]">
        <div className="w-full">
          <div className="mx-auto my-0 w-full max-w-[960px]">
            <div className="flex flex-col items-center">
              <h1 className="mb-[20px] text-[51px] font-light">Sign Up</h1>
              <div className="flex w-full max-w-[400px] flex-col items-center">
                <div className="flex w-full flex-col">
                  <div>
                    {errors && (
                      <p className="mb-[20px] text-center text-red-500">
                        {errors.error}
                      </p>
                    )}
                    {/* Form */}
                    <form onSubmit={submitHandler}>
                      <div className="w-full">
                        <motion.p
                          className="pointer-events-none absolute text-gray-400"
                          animate={usernameMotion.animation}
                          transition={usernameMotion.transition}
                        >
                          Username
                        </motion.p>
                        <div className="flex flex-row">
                          <input
                            type="text"
                            value={username}
                            className="w-full border-b-[1px] border-black bg-inherit pb-[3px] focus:outline-none"
                            onChange={(e) => {
                              setUsername(e.target.value);
                              handleUserDuplicate(e.target.value);
                            }}
                          />
                          <FiRefreshCcw
                            className="ml-[-25px] cursor-pointer"
                            size={20}
                            id="togglePassword"
                            onClick={() => generateUserName()}
                          />
                        </div>
                      </div>
                      {username.length > 1 && dupUserCheck.error ? (
                        <p className="absolute text-[12px] text-green-500">
                          {dupUserCheck.msg}
                        </p>
                      ) : (
                        <p className="absolute text-[12px] text-red-500">
                          {dupUserCheck.msg}
                        </p>
                      )}
                      <div className="mt-[35px] w-full">
                        <motion.p
                          className="pointer-events-none absolute translate-x-1 text-gray-400"
                          animate={emailMotion.animation}
                          transition={emailMotion.transition}
                        >
                          Email
                        </motion.p>
                        <input
                          type="text"
                          value={email}
                          className="w-full border-b-[1px] border-black bg-inherit pb-[3px] focus:outline-none"
                          onChange={(e) => {
                            setEmail(e.target.value);
                            handleEmailDuplicate(e.target.value);
                          }}
                        />
                        {dupEmailCheck.error ? (
                          <p className="absolute text-[12px] text-green-500">
                            {dupEmailCheck.msg}
                          </p>
                        ) : (
                          <p className="absolute text-[12px] text-red-500">
                            {dupEmailCheck.msg}
                          </p>
                        )}
                      </div>
                      <div>
                        <div className="mt-[35px] flex w-full">
                          <motion.p
                            className="pointer-events-none absolute translate-x-2 text-gray-400"
                            animate={passwordMotion.animation}
                            transition={passwordMotion.transition}
                          >
                            Password
                          </motion.p>
                          <input
                            type={togglePassword}
                            value={password}
                            className="w-full border-b-[1px] border-black bg-inherit pb-[3px] focus:outline-none"
                            onChange={(e) => {
                              setPassword(e.target.value);
                              handleValidatePassword(e.target.value);
                              handleRequiredPasswordError(e.target.value);
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
                        {password.length === 0 && requiredPassword ? (
                          <p className="absolute text-[12px] text-red-500">
                            {requiredPassword}
                          </p>
                        ) : (
                          ""
                        )}
                        {password.length !== 0 && passwordError && (
                          <p className="absolute text-[12px] text-red-500">
                            {passwordError}
                          </p>
                        )}
                      </div>

                      <div className="mt-[35px] w-full">
                        <motion.p
                          className="pointer-events-none absolute translate-x-1 text-gray-400"
                          animate={confirmPasswordMotion.animation}
                          transition={confirmPasswordMotion.transition}
                        >
                          Confirm Password
                        </motion.p>
                        <input
                          type={togglePassword}
                          value={confirmPassword}
                          className="w-full border-b-[1px] border-black bg-inherit pb-[3px] focus:outline-none"
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            handleRequiredConfirmPasswordError(e.target.value);
                            handlePasswordMatch(e.target.value);
                          }}
                        />
                        {confirmPassword.length !== 0 &&
                          confirmPassword !== password && (
                            <p className="absolute text-[12px] text-red-500">
                              {passwordMatchError}
                            </p>
                          )}
                        {confirmPassword.length === 0 &&
                          requiredConfirmPassword && (
                            <p className="absolute text-[12px] text-red-500">
                              {requiredConfirmPassword}
                            </p>
                          )}
                      </div>
                      <div className="mt-[25px] flex justify-center">
                        <button
                          className="mb-[5px] h-[40px] w-full rounded-[4px] bg-sky-500 disabled:bg-red-200 disabled:text-white"
                          disabled={
                            password !== confirmPassword ||
                            !password ||
                            !confirmPassword ||
                            passwordError ||
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

                    <div className="my-[20px] border-b border-black bg-inherit text-center leading-[0.1em]">
                      <span
                        // style={{
                        //   background: "#ffe4e6 var(--tw-gradient-to-position)",
                        // }}
                        className="bg-white px-[10px]"
                      >
                        or
                      </span>
                    </div>

                    <div
                      className="mt-[20px] flex text-[14px]"
                      style={{ justifyContent: "space-between" }}
                    >
                      <button className="mb-[5px] h-[40px] w-[49%] rounded-[4px] border border-gray-300 bg-white">
                        {" "}
                        <div className="flex items-center justify-center">
                          <FcGoogle className="mr-[5px] text-[16px]" />
                          <p className="font-normal">Continue with Google</p>
                        </div>
                      </button>
                      <button className="mb-[5px] h-[40px] w-[49%] rounded-[4px] border border-gray-300 bg-white">
                        {" "}
                        <div className="flex items-center justify-center">
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
