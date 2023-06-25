function LoginPage() {

  return (
    <div className="w-screen mt-[80px]">
      <form action="" className="flex flex-col items-center">
        <h1 className="text-6xl mb-[50px]">Login</h1>
        {/* Username and Email Section */}
        <div className="mb-[50px]">
          <input
            type="text"
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Username or Email"
          />
        </div>
        {/* Password Section */}
        <div className="mb-[10px]">
          <input
            type="text"
            className="bg-inherit border-b-[1px] border-black w-[400px] focus:outline-none"
            placeholder="Password"
          />
        </div>
      <div>
        {/* Save Password Checkbox */}
        <div className="mb-[5px] mt-[10px]">
          <input type="checkbox" />
          <span className="ml-[5px]">Save Password</span>
        </div>

        {/* Forgot Password and Sign up for Raynian */}
        <div className="flex space-x-36">
          <p>Forgot Password?</p>
          <p>Sign up for Raynian</p>
        </div>
      </div>
      </form>
    </div>
  );
}

export default LoginPage;
