function ProfilePage() {
  return (
    <div className="w-screen">
      <div className="mx-40">
        <div className="flex mb-5 mt-10">
          <img
            src="https://media.licdn.com/dms/image/D5605AQGI5_OHE35wOQ/videocover-low/0/1684902314609?e=2147483647&v=beta&t=fAVWnrkTN8KFUDi-i2JqCu60RtWF4cSzSeO3kk2vim0"
            className="w-40 h-40 rounded-xl"
          />
          <div className="pl-4">
            <h1 className="text-3xl">Christian Felix</h1>
            <button className="bg-gray-400 w-[70px] h-[20px] text-[10px] text-white">Edit Profile</button>
          </div>
        </div>
        <div className="border-t-[1px] border-black"></div>
        <div className="flex space-x-4 mt-5">
          <div className="text-3xl">Profile</div>
          <div className="text-3xl">Achievement</div>
          <div className="text-3xl">Statistics</div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
