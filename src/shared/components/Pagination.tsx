// import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange,
// }: PaginationProps) {
//   return (
//     <div className="flex justify-center items-center gap-4 border p-4 ">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         className="border px-2 py-1 rounded cursor-pointer"
//         disabled={currentPage === 1}
//       >
//         <ArrowLeft />
//       </button>
//       <span>
//         Page {currentPage} of {totalPages}
//       </span>
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         className="border px-2 py-1 rounded cursor-pointer"
//         disabled={currentPage === totalPages}
//       >
//         <ArrowRight />
//       </button>
//     </div>
//   );
// }

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  to: string; // Route path for navigation (e.g., "/superheroes/paginated")
}

export default function Pagination({
  currentPage,
  totalPages,
  limit,
  to,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 border p-4">
      <Link
        to={to}
        search={{ page: currentPage - 1, limit }}
        disabled={currentPage === 1}
        className={`border px-2 py-1 rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 cursor-pointer"
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
            : "hover:bg-gray-100 cursor-pointer"
        }`}
      >
        <ArrowRight />
      </Link>
    </div>
  );
}
