import thick_logo from "./assets/thick_logo.svg";
import { FaCog } from "react-icons/fa";
import Profile from "./components/Profile";
import { ModalProvider } from "./context/ModalContext";
import sushi from "./assets/temp_pfp/sushi.jpg";
import boba from "./assets/temp_pfp/boba.jpg";
import avocado from "./assets/temp_pfp/avocado.jpg";
import ProfileGrid from "./components/ProfileGrid";
import Nav from "./components/navigation/Nav";
import Timer from "./components/Timer";
import "./index.css";

function App() {
  const profiles = [sushi, avocado, boba]; // Add more profiles if needed

  return (
    <ModalProvider>
      <div className="h-screen w-screen bg-gradient-to-b from-slate-50 to-rose-50 font-thin">
        <Nav />
        <div className="h-[60%] flex items-center justify-center flex-col">
          <div className="text-center ">
            <p className="text-3xl">You're doing great!</p>
            <Timer />
            <p className="text-3xl">Sessions completed today:</p>
            <span className="text-3xl">2</span>
          </div>
          <ProfileGrid profiles={profiles} />
        </div>
      </div>
    </ModalProvider>
  );
}

export default App;
