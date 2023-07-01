import React, { useContext, useRef, useEffect } from "react";
import { ModalContext } from "../../context/ModalContext";
import { DarkLightContext } from "../../context/DarkLightContext";
import { FaRegMoon } from "react-icons/fa";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { removeCredentials } from "../../slices/authSlice";

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
  }, []);

  const [logout] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      toggleDropdown();
      console.log("test");
    } catch (err) {
      console.log(err);
    }
  };
  if (!openDropdown) return null;
  if (userInfo) {
    content = (
      <>
        <button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
        >
          Profile
        </button>
        <button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
        >
          Settings
        </button>
        <button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
        >
          Stats
        </button>
        <button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </>
    );
  } else {
    content = (
      <>
        <button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={() => {
            toggleLogin();
            toggleDropdown();
          }}
        >
          Login
        </button>
        <button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={() => {
            toggleSignup();
            toggleDropdown();
          }}
        >Signup
        </button>
      </>
    );
  }

  return (
    <div
      className={`absolute flex flex-col justify-center right-[20px] top-[80px] rounded-[8px]  bg-white drop-shadow-md dark:bg-slate-900 dark:text-white transition`}
      onClick={(e) => e.stopPropagation()}
      ref={dropdownRef}
    >
      <div className="flex flex-col">{content}</div>
      <div className="py-[5px] px-[20px]">
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
      </div>
    </div>
  );
}
