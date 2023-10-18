import { CiTwitter, CiLinkedin, CiFacebook, CiInstagram } from 'react-icons/ci'
import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai'
function ProfilePage() {
  return (
    <div className="w-[90%] h-[90%] bg-white relative" onClick={(event) => event.stopPropagation()}>
      <div className="h-full">
        <section className="flex flex-col">
          <div className="w-full bg-[#D9D9D9] h-[200px]"></div>
          <div className="flex items-center w-full justify-center h-[100px] my-[-50px]">
            {/* Social media icons */}
            <div className='flex gap-1 mt-6 mr-3 text-xl'>
              <CiLinkedin />
              <CiFacebook/>
              {/* <CiTwitter/>
              <CiInstagram /> */}
            </div>
            {/* Image Place holder below */}
            <div className="rounded-[50%] h-[100px] w-[100px] bg-slate-200 border border-black"></div>
            {/* Friends icon and email/message icon */}
            <div className='flex gap-1 mt-6 ml-3 text-xl'>
              <AiOutlineUserAdd />
              <AiOutlineMail />
            </div>
          </div>
          {/* Username, Date Joined, Bio */}
          <div className="flex flex-col justify-center w-full items-center mt-[50px]">
            <div>
              @Raynian
            </div>
            <div className="text-[10px]">
              Joined on August 2023
            </div>
            <div className="text-sm">Software Web Application</div>
          </div>
        </section>
        <section>
          <div className="flex gap-3 justify-between  m-5">
            <div className="w-52 bg-slate-400"><p className='text-center w-full'>Achievments</p></div>
            <div className="w-52 bg-slate-400 h-full">
              <p className='text-center w-full'>Statistics</p>
            </div>
            <div className="w-52 bg-slate-400"><p className='text-center w-full'>Friends</p></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
