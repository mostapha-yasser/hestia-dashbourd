import { Mail, Phone, MapPin, User, MessageSquare } from "lucide-react";
import Link from "next/link";
import ErrorMessage from "../ui/ErrorMessage";
import useGetUserDetails from "@/Hooks/useGetUserDetail";

export function CustomerData({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useGetUserDetails(userId);
  if (isLoading) {
    return (
      <>
 <div className="w-full  flex flex-col items-center justify-center  bg-main-light  ">
      <div className="w-16 h-16 border-t-4 border-r-4 border-b-4  border-main rounded-full animate-spin"></div>
      <span className="mt-4 text-xl font-bold text-main  ">
        Please Wait ...
      </span>
      <div className="mt-2 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className=" bg-main animate-pulse"></div>
      </div>
    </div>      </>
    );
  }
  if (error) {
    return (
      <ErrorMessage message={error.message || "Failed to load customer data"} />
    );
  }

  if (!user) {
    return <ErrorMessage message="Customer not found" />;
  }

  const { fullName, address, city, phone, whatsApp, email } = user;

  return (
    <div className="w-full lg:w-8/12 border-2 border-main/20 rounded-lg p-4">
      <p className="text-lg font-bold text-main mb-4">Customer Information</p>
      <section className="m-auto text-sm xl:text-base grid grid-cols-1 sm:grid-cols-2 gap-y-3 overflow-hidden">
        <div className="flex items-center gap-2">
          <User size={18} className="text-main" />
          <div>
            <p className="font-semibold text-gray-600">Full Name</p>
            <p className="truncate" title={fullName}>
              {fullName}
            </p>
          </div>
        </div>

        {email && (
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-main" />
            <div>
              <p className="font-semibold text-gray-600">Email</p>
              <Link
                href={`mailto:${email}`}
                className="hover:underline text-blue-600"
              >
                {email}
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-main" />
          <div>
            <p className="font-semibold text-gray-600">Address</p>
            <p className="truncate" title={`${address}, ${city}`}>
              {address}, {city}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone size={18} className="text-main" />
          <div>
            <p className="font-semibold text-gray-600">Phone</p>
            <Link href={`tel:${phone}`} className="hover:underline">
              {phone}
            </Link>
          </div>
        </div>

        {whatsApp && (
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-main" />
            <div>
              <p className="font-semibold text-gray-600">WhatsApp</p>
              <Link
                href={`https://wa.me/${whatsApp}`}
                target="_blank"
                className="hover:underline text-green-600"
              >
                {whatsApp}
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
