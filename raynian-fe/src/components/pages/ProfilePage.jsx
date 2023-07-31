function ProfilePage() {
  return (
    <div className="w-screen">
      <div className="mx-40">
        <div className="mb-5 mt-10 flex">
          <img className="h-[140px] w-[140px] rounded-xl bg-gray-300" />
          <div className="pl-4">
            <h1 className="text-3xl">Christian Felix</h1>
            <button className="h-[20px] w-[70px] bg-gray-400 text-[12px] text-gray-700">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="border-t-[1px] border-black"></div>
        <div className="mt-5 flex space-x-4">
          <div className="text-3xl">Profile</div>
          <div className="text-3xl">Achievement</div>
          <div className="text-3xl">Statistics</div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
