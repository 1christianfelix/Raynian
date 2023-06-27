import thick_logo from "./assets/thick_logo.svg";
import { FaCog } from "react-icons/fa";
import Profile from "./components/Profile";
import { ModalProvider } from "./context/ModalContext";
import { DarkLightProvider } from "./context/DarkLightContext";
import { TimerProvider } from "./context/TimerContext";
import sushi from "./assets/temp_pfp/sushi.jpg";
import boba from "./assets/temp_pfp/boba.jpg";
import avocado from "./assets/temp_pfp/avocado.jpg";
import ProfileGrid from "./components/ProfileGrid";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ProfilePage from "./components/pages/ProfilePage";
import Nav from "./components/navigation/Nav";
import Timer from "./components/Timer";
import "./index.css";

function App() {
  const profiles = [sushi, avocado, boba]; // Add more profiles if needed

  return (
    <DarkLightProvider>
      <ModalProvider>
        <div className="h-screen w-screen bg-gradient-to-b from-slate-100 to-rose-100 font-thin dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-800 dark:text-white">
          <Nav />
          {/* <SignupPage /> */}
          {/* <LoginPage/> */}
          <div className="h-[60%] flex items-center justify-center flex-col">
            <div className="text-center ">
              <p className="text-3xl">You're doing great!</p>
              <TimerProvider>
                <Timer />
              </TimerProvider>
              <p className="text-3xl">Sessions completed today:</p>
              <span className="text-3xl">2</span>
            </div>
            <ProfileGrid profiles={profiles} />
          </div>
        </div>
      </ModalProvider>
    </DarkLightProvider>
  );
}

export default App;
