import { Route, Routes } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import { DarkLightProvider } from "./context/DarkLightContext";
import Nav from "./components/navigation/Nav";
import "./index.css";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ProfilePage from "./components/pages/ProfilePage";

import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <DarkLightProvider>
      <ModalProvider>
        <div className="h-screen w-screen bg-gradient-to-b from-slate-100 to-rose-100 font-thin dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-800 dark:text-white">
          <Nav />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
          </Routes>
        </div>
      </ModalProvider>
    </DarkLightProvider>
  );
}

export default App;
