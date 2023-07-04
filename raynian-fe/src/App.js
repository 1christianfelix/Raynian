import { Route, Routes } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import { DarkLightProvider } from "./context/DarkLightContext";
import { BGCustomProvider } from "./context/BGCustomContext";
import Nav from "./components/navigation/Nav";
import "./index.css";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import OAuthLoginSuccess from "./components/pages/OAuthLoginSuccess";
import ProfilePage from "./components/pages/ProfilePage";
import Modal from "./components/util/Modal";
import ColorSelection from "./components/ui/background-customizer/ColorSelection";

import Dashboard from "./components/pages/Dashboard";
import { PageNotFound } from "./components/pages/PageNotFound";
import GradientSlider from "./components/ui/background-customizer/GradientSlider";
import GradientSliderHandle from "./components/ui/background-customizer/GradientSliderHandle";
import BgCustomizerMenu from "./components/ui/background-customizer/BgCustomizerMenu";

function App() {
  return (
    <BGCustomProvider>
      <DarkLightProvider>
        <ModalProvider>
          <div className="h-screen w-screen bg-gradient-to-b from-slate-100 to-rose-100 font-thin dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-800 dark:text-white">
            {/* <ColorSelection></ColorSelection> */}
            <BgCustomizerMenu></BgCustomizerMenu>
            {/* <GradientSlider></GradientSlider> */}
            {/* <GradientSliderHandle></GradientSliderHandle> */}
            {/* <Modal />
          <Nav />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/PageNotFound" element={<PageNotFound />}></Route>
            <Route
              path="auth/login/success"
              element={<OAuthLoginSuccess />}
            ></Route>
          </Routes> */}
          </div>
        </ModalProvider>
      </DarkLightProvider>
    </BGCustomProvider>
  );
}

export default App;
