import { superheroes } from "../../../mocks/superheroes";
import Pagination from "../../../shared/components/Pagination";
import usePagination from "../../../shared/hooks/usePagination";
import SuperheroCard from "../components/SuperheroCard";

export default function SuperheroListPage() {
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(superheroes.length / ITEMS_PER_PAGE);
  const { currentPage, goToPage } = usePagination(totalPages);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center items-start place-content-center p-4">
          {superheroes
            .slice(5 * (currentPage - 1), 5 * currentPage)
            .map((item) => (
              <SuperheroCard
                key={item.superhero.id}
                superhero={item.superhero}
              />
            ))}
        </div>
      </div>
      <div className="p-4 border-t">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
}
