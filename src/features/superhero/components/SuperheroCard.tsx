import { Link } from "@tanstack/react-router";

interface SuperheroCardProps {
  superhero: {
    id: number;
    nickname: string;
    realName?: string | null;
    images?: {
      url: string;
    }[];
    // originDescription: string;
    // catchPhrase?: string | null;
    // type: HeroType;
    // superPowers?: {
    //   connect?: number[];
    //   create?: { name: string }[];
    // };
  };
}

export default function SuperheroCard({ superhero }: SuperheroCardProps) {
  return (
    <Link
      to="/superheroes/$id"
      params={{ id: superhero.id.toString() }}
      className="w-full h-full"
    >
      <section className="flex flex-col h-full group cursor-pointer">
        <div className="h-[65%]">
          <img
            src={superhero.images?.[0]?.url || "/explore-no-img.jpg"}
            alt="superhero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative h-[35%] border-t-4 border-t-red-500 overflow-hidden bg-[#1e2029]">
          {/* gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-500 to-red-500 -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

          <div className="h-full relative z-10 text-white flex flex-col justify-between p-3">
            <h3 className="font-bold uppercase text-sm truncate">
              {superhero.nickname}
            </h3>
            <p className="font-light uppercase text-xs text-[#bbb] group-hover:text-white transition-text duration-400 truncate">
              {superhero.realName}
            </p>
          </div>
        </div>
      </section>
    </Link>
  );
}
