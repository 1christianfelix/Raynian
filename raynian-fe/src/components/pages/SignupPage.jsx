import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function SignupPage() {
  const [togglePassword, setTogglePassword] = useState("password");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleTogglePassword = () => {
    if (togglePassword === "password") setTogglePassword("text");
    else setTogglePassword("password");
  };

  return (
    <div className="w-full flex flex-row mt-[20px]">
      <div className="pl-[60px] pr-[60px] w-full mx-auto mb-0 overflow-visible">
        <div className="w-full">
          <div className="w-full max-w-[960px] mx-auto mt-0 mb-0">
            <div className="flex flex-col items-center">
              <h1 className="text-[64px] mb-[30px]">Sign Up</h1>
              <div className="w-full flex flex-col items-center max-w-[400px]">
                <div className="flex w-full flex-col">
                  <div>
                    <form type="submit">
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
                      <div className="w-full mb-[30px]">
                        <input
                          type={togglePassword}
                          value={confirmPassword}
                          placeholder="Confirm Password"
                          className="w-full border-b-[1px] border-black focus:outline-none bg-inherit pb-[3px]"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      {/* Check boxes */}
                      <div className="w-full">
                        <div
                          className="mb-[5px] mt-[10px] flex w-full"
                          style={{justifyContent: 'space-between'}}
                        >
                          <div>
                            <div>
                              <input type="checkbox" />
                              <span className="ml-[5px]">
                                Terms of Agreement
                              </span>
                            </div>
                            <div>
                              <input type="checkbox" />
                              <span className="ml-[5px]">
                                Subscribe to newsletter
                              </span>
                            </div>
                          </div>
                          <div>
                            <p>Already have an account?</p>
                          </div>
                        </div>

                      </div>
                      <div className="flex justify-center mt-[10px]">
                        <button className="bg-slate-300 w-full h-[40px] rounded-[4px]">
                          Sign up
                        </button>
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

    // <div className="w-full">
    //   <div className="w-full mt-[20px]">
    //     <div className="max-w-xl mx-auto mb-0">
    //       <div className="w-full max-w-[400px] mx-auto mb-0">
    //         <div className="w-full">
    //           <form action="" className="w-full flex flex-col items-center">
    //             <h1 className="text-6xl mb-[50px]">Sign Up</h1>
    //             {/* Username and Email Section */}
    //             <div className="mb-[50px] w-full">
    //               <input
    //                 type="text"
    //                 value={username}
    //                 className="bg-inherit border-b-[1px] border-black focus:outline-none bg-none w-fit"
    //                 placeholder="Username"
    //                 onChange={(e) => setUsername(e.target.value)}
    //               />
    //             </div>
    //             <div className="mb-[50px]">
    //               <input
    //                 type="email"
    //                 value={email}
    //                 className="bg-inherit border-b-[1px] border-black focus:outline-none bg-none w-fit"
    //                 placeholder="Email"
    //                 onChange={(e) => setEmail(e.target.value)}
    //               />
    //             </div>

    //             {/* Password Section */}
    //             <div className="mb-[50px] flex ml-[-6px]">
    //               <input
    //                 type={togglePassword}
    //                 value={password}
    //                 className="bg-inherit border-b-[1px] border-black focus:outline-none bg-none w-fit"
    //                 placeholder="Password"
    //                 onChange={(e) => setPassword(e.target.value)}
    //               />
    //               {togglePassword === "text" ? (
    //                 <FaEyeSlash
    //                   className="ml-[-25px] cursor-pointer"
    //                   size={20}
    //                   id="togglePassword"
    //                   onClick={() => handleTogglePassword()}
    //                 />
    //               ) : (
    //                 <FaEye
    //                   className="ml-[-25px] cursor-pointer"
    //                   size={20}
    //                   id="togglePassword"
    //                   onClick={() => handleTogglePassword()}
    //                 />
    //               )}
    //             </div>
    //             <div className="mb-[10px] flex">
    //               <input
    //                 type={togglePassword}
    //                 value={confirmPassword}
    //                 className="bg-inherit border-b-[1px] border-black focus:outline-none bg-none"
    //                 placeholder="Confirm Password"
    //                 onChange={(e) => setConfirmPassword(e.target.value)}
    //               />
    //             </div>

    //             {/* Check boxes */}
    //             <div className="">
    //               <div
    //                 className="mb-[5px] mt-[10px]"
    //                 style={{ display: "flex", justifyContent: "space-around" }}
    //               >
    //                 <div>
    //                   <div>
    //                     <input type="checkbox" />
    //                     <span className="ml-[5px]">Terms of Agreement</span>
    //                   </div>
    //                   <div>
    //                     <input type="checkbox" />
    //                     <span className="ml-[5px]">
    //                       Subscribe to newsletter
    //                     </span>
    //                   </div>
    //                 </div>
    //                 <div>
    //                   <p>Already have an account?</p>
    //                 </div>
    //               </div>

    //               {/* Signup Button */}
    //               <button className="bg-gray-300 w-[100px] rounded-[3px]">
    //                 Sign Up
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default SignupPage;
