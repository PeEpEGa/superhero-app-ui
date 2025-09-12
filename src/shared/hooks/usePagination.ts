import { useState } from "react";

export default function usePagination(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return { currentPage, goToPage };
}
