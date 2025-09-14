import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  to: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  limit,
  to,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 p-4 bg-[#151515] text-white">
      <Link
        to={to}
        search={{ page: currentPage - 1, limit }}
        disabled={currentPage === 1}
        className={`border px-2 py-1 rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 hover:text-black cursor-pointer"
        }`}
      >
        <ArrowLeft />
      </Link>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Link
        to={to}
        search={{ page: currentPage + 1, limit }}
        disabled={currentPage === totalPages}
        className={`border px-2 py-1 rounded ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 hover:text-black cursor-pointer"
        }`}
      >
        <ArrowRight />
      </Link>
    </div>
  );
}
