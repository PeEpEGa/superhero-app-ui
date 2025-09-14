import type { Superhero } from "../types/superhero.interface";
import SuperheroCard from "./SuperheroCard";

interface SuperheroListProps {
  superheroes: Superhero[];
}

export default function SuperheroList({ superheroes }: SuperheroListProps) {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center items-center p-4 auto-rows-auto h-full bg-[#151515]">
      {superheroes.map((superhero) => (
        <SuperheroCard key={superhero.id} superhero={superhero} />
      ))}
    </div>
  );
}
