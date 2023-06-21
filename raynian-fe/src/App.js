import thick_logo from "./assets/thick_logo.svg";
import { FaCog } from "react-icons/fa";
import Profile from "./components/Profile";
import sushi from "./assets/temp_pfp/sushi.jpg";
import boba from "./assets/temp_pfp/boba.jpg";
import avocado from "./assets/temp_pfp/avocado.jpg";
import ProfileGrid from "./components/ProfileGrid";

function App() {
  const profiles = [sushi, avocado, boba]; // Add more profiles if needed

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-slate-50 to-rose-50 font-thin font-inter">
      <div className="Header h- w-screen p-[0.9375rem] flex justify-between">
        <div className="flex items-center gap-[1.25rem]">
          <img src={thick_logo} alt="logo" className="h-[4.5rem]" />
          <p className="text-3xl ">raynian</p>
        </div>
        <FaCog size={66}></FaCog>
      </div>
      <div className="h-[60%] flex items-center justify-center flex-col">
        <div className="text-center ">
          <p className="text-3xl">You're doing great!</p>
          <p className="text-[128px] leading-tight">58:32</p>
          <p className="text-3xl">Sessions completed today:</p>
          <span className="text-3xl">2</span>
        </div>
        <ProfileGrid profiles={profiles} />
      </div>
    </div>
  );
}

export default App;
