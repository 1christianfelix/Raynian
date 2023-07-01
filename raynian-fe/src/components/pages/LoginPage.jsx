import { FaEye, FaEyeSlash } from "react-icons/fa";
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
      className="py-10 flex flex-row mt-[20px] bg-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="pl-[60px] pr-[60px] w-full mx-auto mb-0 overflow-visible">
        <div className="w-full">
          <div className="w-full max-w-[960px] mx-auto mt-0 mb-0">
            <div className="flex flex-col items-center">
              <h1 className="text-[64px] mb-[30px]">Login</h1>
              <div className="w-full flex flex-col items-center max-w-[400px]">
                <div className="flex w-full flex-col">
                  <div>
                    <form onSubmit={submitHandler}>
                      <div className="w-full mb-[30px]">
                        <input
                          type="text"
                          value={user}
                          placeholder="Username or Email"
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => setUser(e.target.value)}
                        />
                      </div>
                      <div className="w-full mb-[20px] flex">
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
                      <div className="w-full ">
                        <div
                          className="flex space-x-reverse mb-[10px]"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div>
                            <input type="checkbox" className=""></input>
                            <span className="ml-[5px]">Save Password</span>
                          </div>
                          <div>
                            <p>Forgot Password?</p>
                          </div>
                        </div>
                        <div>
                          <button className="bg-slate-300 w-full h-[40px] rounded-[4px] mb-[10px]">
                            Login
                          </button>
                        </div>
                        <div className="grid place-content-center">
                          <p>Don't have an account?</p>
                          <p className="ml-[10px]">Create an account</p>
                        </div>
                      </div>
                    </form>
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
