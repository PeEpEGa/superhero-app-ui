import { useSearch } from "@tanstack/react-router";
import Pagination from "../../../shared/components/Pagination";
import { superheroQueryOptions } from "../queries/superheroQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import SuperheroList from "../components/SuperheroList";

export default function SuperheroListPage() {
  const { page, limit } = useSearch({ from: "/superheroes/paginated" });
  const { data } = useSuspenseQuery(superheroQueryOptions(page, limit));

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto">
        <SuperheroList superheroes={data.data} />
      </div>
      <div className="p-4 border-t bg-[#212121]">
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
