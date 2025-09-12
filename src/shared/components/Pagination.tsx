import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 border p-4 ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="border px-2 py-1 rounded cursor-pointer"
        disabled={currentPage === 1}
      >
        <ArrowLeft />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="border px-2 py-1 rounded cursor-pointer"
        disabled={currentPage === totalPages}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
