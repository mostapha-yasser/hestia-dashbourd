import { DashboardCardProps } from "@/types/card";

function DashboardCard({
  label,
  amount,
  description,
  Icon,
}: DashboardCardProps) {
  return (
    <div className="hover:-translate-y-4  group duration-500 bg-Chart-Background w-44 h-44 flex text-Text flex-col justify-center items-center relative rounded-xl overflow-hidden ">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute blur z-10 fill-Aside-Border duration-500 group-hover:blur-none group-hover:scale-110"
      ><path
          transform="translate(100 100)"
          d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z" >

          </path>
      </svg>

      <div className="z-20 flex flex-col justify-center items-center">
        <span className="font-bold text-3xl ml-2">
          <Icon className="w-6 h-6" />
          {label}
        </span>
        <p className="font-bold text-3xl ">{amount}</p>
        <span className="font-bold text-sm">{description}</span>
      </div>
    </div>
  );
}

export default DashboardCard;
