"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import AsideBar from "./AsideBar";
import LogoutModel from "../models/LogoutModel";

function Aside() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const toggleLogoutModel = () => {
    setIsModelOpen((prev) => !prev);
  };

  const toggleAside = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="fixed lg:hidden top-0 z-50 w-full bg-Aside-Border h-6">
        <Menu onClick={toggleAside} />
      </div>
      <div className=" lg:hidden fixed lg:static z-45 top-6 min-w-1/5  ">
        <AsideBar
          isVisible={isSidebarOpen}
          toggleLogoutModel={toggleLogoutModel}
        />
      </div>

      <div className="hidden lg:block  lg:min-w-2/9 xl:min-w-1/7 ">
        <AsideBar isVisible={true} toggleLogoutModel={toggleLogoutModel} />
      </div>

      <LogoutModel
        closeLogoutModel={toggleLogoutModel}
        isModelOpen={isModelOpen}
      />
    </>
  );
}

export default Aside;
