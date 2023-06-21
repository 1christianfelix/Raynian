import thick_logo from "./assets/thick_logo.svg";
import { FaCog } from "react-icons/fa";

function App() {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-slate-50 to-rose-50">
      <div className="Header h- w-screen p-[0.9375rem] flex justify-between">
        <div className="flex items-center gap-[1.25rem]">
          <img src={thick_logo} alt="logo" className="h-[4.5rem]" />
          <p className="text-3xl font-thin font-inter">raynian</p>
        </div>
        <div className="">58:32</div>
        <FaCog size={66}></FaCog>
      </div>
    </div>
  );
}

export default App;
