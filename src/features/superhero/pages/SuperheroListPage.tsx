import { useSearch } from "@tanstack/react-router";
import Pagination from "../../../shared/components/Pagination";
import SuperheroCard from "../components/SuperheroCard";
import { superheroQueryOptions } from "../queries/superheroQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function SuperheroListPage() {
  //   const ITEMS_PER_PAGE = 5;
  //   const totalPages = Math.ceil(superheroes.length / ITEMS_PER_PAGE);
  //   const { currentPage, goToPage } = usePagination(totalPages);

  const { page, limit } = useSearch({ from: "/superheroes/paginated" });
  const { data } = useSuspenseQuery(superheroQueryOptions(page, limit));

  //   const { currentPage, limit: currentLimit, goToPage } = usePagination(
  //     data.pagination.totalPages,
  //     "/superheroes/paginated",
  //     "/superheroes/paginated"
  //   );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center items-start place-content-center p-4">
          {data.data.map((superhero) => (
            <SuperheroCard key={superhero.id} superhero={superhero} />
          ))}
        </div>
      </div>
      <div className="p-4 border-t">
        <Pagination
          currentPage={data.pagination.page}
          totalPages={data.pagination.totalPages}
          limit={data.pagination.limit}
          to={"/superheroes/paginated"}
        />
      </div>
    </div>
  );
}
