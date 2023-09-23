import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import { DarkLightProvider } from "./context/DarkLightContext";
import { RoomProvider } from "./context/RoomContext";

import Nav from "./components/navigation/Nav";
import "./index.css";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import OAuthLoginSuccess from "./components/pages/OAuthLoginSuccess";
import ProfilePage from "./components/pages/ProfilePage";
import Modal from "./components/util/Modal";
import BgCustomizerMenu from "./components/ui/background-customizer/BgCustomizerMenu";

import Dashboard from "./components/pages/Dashboard";
import { PageNotFound } from "./components/pages/PageNotFound";

import { BGCustomContext } from "./context/BGCustomContext";
// import Chat from "./components/socket-testing/Chat";

function App() {
  const { bg } = useContext(BGCustomContext);
  return (
    <DarkLightProvider>
      <RoomProvider>
        <ModalProvider>
          <div
            className="h-screen w-screen font-thin text-neutral-900 dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-800 dark:text-white"
            style={{ background: bg }}
          >
            <div className="absolute bottom-52 left-48">
              <BgCustomizerMenu></BgCustomizerMenu>
            </div>
            <Modal />

            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/PageNotFound" element={<PageNotFound />}></Route>
              <Route
                path="auth/login/success"
                element={<OAuthLoginSuccess />}
              ></Route>
            </Routes>
          </div>
        </ModalProvider>
      </RoomProvider>
    </DarkLightProvider>
  );
}

export default App;
