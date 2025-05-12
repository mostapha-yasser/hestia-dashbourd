import ActiveLink from "../ui/ActiveLink";
import Link from "next/link";
import {
  ChartColumnIncreasing,
  LogOut,
  PackageOpen,
  ShoppingBag,
} from "lucide-react";
function AsideBar({
  isVisible,
  toggleLogoutModel,
}: {
  isVisible: boolean;
  toggleLogoutModel: () => void;
}) {
  return (
    <div
      className={`${
        isVisible
          ? "visible translate-x-0 opacity-100"
          : "invisible translate-x-[-100%] opacity-0"
      } 
           transition-all duration-400 ease-out
           w-full min-h-screen grid grid-cols-1 
           border-e-4 border-Aside-Border rounded-br-3xl
          text-Text text-center bg-Aside  shadow-Aside `}
    >
      <div className="w-full ">
          <Link href={"/"}>
            <p className="text-4xl font-bold mt-4 mb-8 cursor-pointer">
              Hestia
            </p>
          </Link>

        <div className="flex flex-col  text-start    space-y-10  text-lg ">
          <ActiveLink targetPath={"/"}>
            <ChartColumnIncreasing /> Performance
          </ActiveLink>
          <ActiveLink targetPath={"/products"}>
            <PackageOpen />
            Show Products
          </ActiveLink>
          <ActiveLink targetPath={"/orders"}>
            <ShoppingBag />
            Show Orders
          </ActiveLink>
          <button
            title="show logout model"
            className=" flex gap-3 justify-start  items-center text-start text-lg cursor-pointer ps-4  py-4 text-nowrap   hover:bg-Background "
            onClick={toggleLogoutModel}
          >
            <LogOut />
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AsideBar;
