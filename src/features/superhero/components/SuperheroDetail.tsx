import { ChevronDown } from "lucide-react";
import type { Superhero } from "../types/superhero.interface";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

interface SuperheroDetailProps {
  superhero: Superhero;
}

export default function SuperheroDetail({ superhero }: SuperheroDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const total = superhero.images?.length ?? 0;
    if (total <= 1) return;

    const interval = setInterval(() => {
      const next = (currentIndex + 1) % total;
      setCurrentIndex(next);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, superhero.images?.length]);

  const currentImage = superhero.images?.[currentIndex]?.url;

  return (
    <article className="w-full h-full overflow-y-scroll snap-y snap-mandatory">
      {/* Section 1 */}
      <section className="relative h-full snap-start justify-center overflow-hidden bg-[#151515] md:bg-white">
        <div className="relative h-full md:h-[600px] w-full md:[clip-path:polygon(0_0,100%_0,100%_90%,0_100%)] overflow-hidden">
          <img
            key={currentIndex}
            src={currentImage}
            alt=""
            className={`md:absolute inset-0 w-full h-[50%] md:h-full object-cover transition-opacity duration-1000}`}
          />

          <div className="h-[50%] md:h-full w-full md:w-1/2 flex flex-col gap-8 p-10 justify-center relative z-10 text-white">
            <p className="uppercase text-xl">{superhero.realName}</p>
            <h2 className="uppercase text-4xl">{superhero.nickname}</h2>
            <p className="text-lg">{superhero.originDescription}</p>
          </div>
        </div>

        {/* Scroll Button */}
        <div className="md:absolute bottom-6 left-1/2 -translate-x-1/2 z-30 p-3 flex flex-col justify-center items-center">
          <p className="uppercase">Scroll down</p>
          <button
            onClick={() => {
              document.getElementById("section-2")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <ChevronDown size={48} strokeWidth={1} />
          </button>
        </div>
      </section>

      {/* Section 2 */}
      <section
        id="section-2"
        className="h-full snap-start bg-gray-900 flex items-center justify-center text-white"
      >
        <p>Section</p>
        <Link
          to="/superheroes/$id/edit"
          params={{ id: superhero.id.toString() }}
        >
          Edit
        </Link>
        {/* <Link to={`/superheroes/${superhero.id}/edit`}>Edit</Link> */}
        {/* <button onClick={() => }></button> */}
      </section>
    </article>
  );
}
