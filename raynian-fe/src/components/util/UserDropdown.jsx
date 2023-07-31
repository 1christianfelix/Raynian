import React, { useContext, useRef, useEffect } from "react";
import { ModalContext } from "../../context/ModalContext";
import { DarkLightContext } from "../../context/DarkLightContext";
import { FaRegMoon } from "react-icons/fa";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApi";
import { removeCredentials } from "../../slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function UserDropdown(props) {
  const { toggleLogin, toggleSignup } = useContext(ModalContext);
  const { theme, toggleDark } = useContext(DarkLightContext);
  const dropdownRef = useRef(null);
  const { openDropdown, toggleDropdown, setToggleDropdown, navRef } = props;
  let content = null;

  const dispatch = useDispatch();

  const handleClickOutside = (event) => {
    if (navRef.current && navRef.current.contains(event.target)) {
      return;
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggleDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const [logout] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      toggleDropdown();
    } catch (err) {
      console.log(err);
    }
  };

  // if (!openDropdown) return null;

  let dropdownAnimation = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.1 } },
  };

  const dropdownTextAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.05 } },
  };

  if (userInfo) {
    content = (
      <>
        <motion.button
          className="px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
          {...dropdownTextAnimation}
        >
          Profile
        </motion.button>
        <motion.button
          className="px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
          {...dropdownTextAnimation}
        >
          Settings
        </motion.button>
        <motion.button
          className="px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
          {...dropdownTextAnimation}
        >
          Stats
        </motion.button>
        <motion.button
          className="px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={logoutHandler}
          {...dropdownTextAnimation}
        >
          Logout
        </motion.button>
      </>
    );
  } else {
    content = (
      <>
        <motion.button
          className="px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={() => {
            toggleLogin();
            toggleDropdown();
          }}
          {...dropdownTextAnimation}
        >
          Login
        </motion.button>
        <motion.button
          className="px-[20px] py-[5px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={() => {
            toggleSignup();
            toggleDropdown();
          }}
          {...dropdownTextAnimation}
        >
          Signup
        </motion.button>
      </>
    );
  }

  return (
    <AnimatePresence>
      {openDropdown && (
        <motion.div
          className={`absolute right-[5px] top-[55px] rounded-[8px]  bg-white drop-shadow-md transition dark:bg-slate-900 dark:text-white`}
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef}
        >
          <motion.div className="flex flex-col" {...dropdownAnimation}>
            {content}
          </motion.div>
          <motion.div className="px-[20px] py-[5px]" {...dropdownTextAnimation}>
            <input
              type="checkbox"
              id="check"
              className="mode-checkbox absolute opacity-0"
              onChange={toggleDark}
              checked={theme === "dark"}
            />
            <label
              htmlFor="check"
              className="mode-label relative flex h-[26px] w-[60px] cursor-pointer items-center justify-between rounded-2xl bg-slate-700 p-[5px]"
            >
              <FaRegMoon className=" text-yellow-400 dark:text-yellow-400" />
              <BsFillBrightnessHighFill className=" text-yellow-400 dark:text-yellow-400" />
              <div className="mode-ball absolute left-[2px] top-[2px] h-[22px] w-[22px] translate-x-0 rounded-full bg-white transition-transform duration-150 ease-linear"></div>
            </label>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
