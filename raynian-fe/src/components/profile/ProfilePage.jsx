function ProfilePage() {
  return (
    <div className="w-[90%] h-[90%] bg-white relative" onClick={(event) => event.stopPropagation()}>
      <div className="">
        <section className="flex flex-col">
          <div className="w-full bg-[#D9D9D9] h-[200px]"></div>
          <div className="flex items-center w-full justify-evenly gap-12">
            {/* Social media icons */}
            <div>Social Media</div>
            {/* Image Place holder below */}
            <div className="rounded-[50%] h-[100px] w-[100px] bg-slate-800 top-[150px] absolute"></div>
            {/* Friends icon and email/message icon */}
            <div>Friends / Email</div>
          </div>
          {/* Username, Date Joined, Bio */}
          <div className="flex flex-col justify-center w-full items-center mt-7">
            <div>
              Username
            </div>
            <div>
              Date Join
            </div>
            <div>Bio</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
