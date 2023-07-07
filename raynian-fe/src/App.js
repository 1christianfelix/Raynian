import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import { DarkLightProvider } from "./context/DarkLightContext";

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

import { BGCustomContext } from "./context/BGCustomContext";
import Chat from "./components/socket-testing/Chat";

function App() {
  const { bg } = useContext(BGCustomContext);
  return (
    <DarkLightProvider>
      <ModalProvider>
        <div
          className="h-screen w-screen bg-gradient-to-b from-slate-100 to-rose-100 font-thin dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-800 dark:text-white"
          style={{ background: bg }}
        >
          <Chat></Chat>
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
  );
}

export default App;
