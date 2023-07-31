import React, { useContext, useRef, useEffect } from "react";
import { ModalContext } from "../../context/ModalContext";
import { DarkLightContext } from "../../context/DarkLightContext";
import { FaRegMoon } from "react-icons/fa";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
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
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
          {...dropdownTextAnimation}
        >
          Profile
        </motion.button>
        <motion.button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
          {...dropdownTextAnimation}
        >
          Settings
        </motion.button>
        <motion.button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
          {...dropdownTextAnimation}
        >
          Stats
        </motion.button>
        <motion.button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
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
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={() => {
            toggleLogin();
            toggleDropdown();
          }}
          {...dropdownTextAnimation}
        >
          Login
        </motion.button>
        <motion.button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
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
          className={`absolute right-[5px] top-[55px] rounded-[8px]  bg-white drop-shadow-md dark:bg-slate-900 dark:text-white transition`}
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef}
        >
          <motion.div className="flex flex-col" {...dropdownAnimation}>
            {content}
          </motion.div>
          <motion.div className="py-[5px] px-[20px]" {...dropdownTextAnimation}>
            <input
              type="checkbox"
              id="check"
              className="mode-checkbox opacity-0 absolute"
              onChange={toggleDark}
              checked={theme === "dark"}
            />
            <label
              for="check"
              className="mode-label relative flex justify-between items-center p-[5px] h-[26px] w-[60px] bg-slate-700 rounded-2xl cursor-pointer"
            >
              <FaRegMoon className=" text-yellow-400 dark:text-yellow-400" />
              <BsFillBrightnessHighFill className=" text-yellow-400 dark:text-yellow-400" />
              <div className="mode-ball absolute bg-white top-[2px] left-[2px] w-[22px] h-[22px] rounded-full translate-x-0 transition-transform duration-150 ease-linear"></div>
            </label>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
