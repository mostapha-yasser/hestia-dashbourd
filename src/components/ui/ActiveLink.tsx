"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function ActiveLink({
  targetPath,
  children,
}: {
  targetPath: string;
  children: ReactNode;
}) {
  const currentPath = usePathname();
  const isActiveLink = currentPath === targetPath;

  return (
    <Link
      href={targetPath}
      className={`flex gap-3 ps-4  py-4 text-nowrap   hover:bg-Background ${
        isActiveLink &&
        "font-bold ps-0 border-s-4 border-Text  bg-white scale-y-110  transition-all "
      } `}
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
