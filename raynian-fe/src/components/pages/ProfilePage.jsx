function ProfilePage() {
  return (
    <div className="w-screen">
      <div className="mx-40">
        <div className="flex mb-5 mt-10">
          <img

            className="w-[140px] h-[140px] rounded-xl bg-gray-300"
          />
          <div className="pl-4">
            <h1 className="text-3xl">Christian Felix</h1>
            <button className="bg-gray-400 w-[70px] h-[20px] text-[12px] text-gray-700">Edit Profile</button>
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
