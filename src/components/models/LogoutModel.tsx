import React from "react";
import ModelContainer from "./ModelContainer";
import { logout } from "@/service/auth/action";

function LogoutModel({closeLogoutModel,isModelOpen}:{closeLogoutModel:()=>void,isModelOpen:boolean}) {
  return (
    <ModelContainer isModelOpen ={isModelOpen} >
      <div className={`min-w-fit p-10 flex flex-col gap-10 bg-white rounded-2xl`}>
        <p>Are you sure you want to logout?</p>
        <div className="flex justify-end gap-5">
          <button onClick={closeLogoutModel} className="border-2 cursor-pointer border-main text-text px-4 py-2 rounded-2xl  " >close</button>
          <button onClick={logout} className="bg-main  cursor-pointer text-white px-4 py-2 rounded-2xl  " >confirm</button>
        </div>
      </div>
    </ModelContainer>
  );
}

export default LogoutModel;
