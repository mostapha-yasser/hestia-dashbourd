import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import QueryProvider from "@/components/tanstackQuery/QueryProvider";
import "../style/globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Private admin dashboard",
  robots: "noindex, nofollow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex ">
        <QueryProvider>
          {children}
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
