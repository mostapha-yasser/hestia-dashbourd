import { ReactNode } from "react";

function ModelContainer({
  children,
  isModelOpen,
}: {
  children: ReactNode;
  isModelOpen: boolean;
}) {
  return (
    <div className={`${!isModelOpen && "hidden"}`}>
      <div className=" fixed inset-0 flex justify-center z-50 items-center bg-black/50">
        {children}
      </div>
    </div>
  );
}

export default ModelContainer;
