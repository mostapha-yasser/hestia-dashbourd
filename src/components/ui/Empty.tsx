import Image from "next/image";
import Link from "next/link";
import EmptyOrdersIllustration from "../../../public/img/EmptyLogo.svg";

export function Empty() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-[50vh] w-full max-w-6xl mx-auto p-6">
      <div className="order-2 lg:order-1 lg:w-1/2 flex flex-col
       items-center lg:items-start gap-6 text-center lg:text-left">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-Text
           ">
            No Orders Received Yet
          </h1>
          <p className="text-Text/70 text-lg max-w-md">
            Your dashboard is ready, but no orders have been placed from the main website. 
            New orders will appear here automatically.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-main/90 hover:bg-main text-white rounded-lg transition-colors duration-300"
          >
            View Products Catalog
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-300"
          >
            Configure Analyzes
          </Link>
        </div>
      </div>

      {/* Illustration */}
      <div className="order-1 lg:order-2 lg:w-1/2 mb-8 lg:mb-0">
        <Image
          src={EmptyOrdersIllustration}
          alt="No orders illustration"
          width={500}
          height={400}
          className="w-full h-auto max-w-lg mx-auto"
          priority
        />
      </div>
    </div>
  );
}