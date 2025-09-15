import { ChevronDown } from "lucide-react";
import type { Superhero } from "../types/superhero.interface";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useSuperheroForm } from "../hooks/useSuperheroForm";

interface SuperheroDetailProps {
  superhero: Superhero;
}

export default function SuperheroDetail({ superhero }: SuperheroDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = superhero.images?.length ?? 0;
  const currentImage =
    total > 0 ? superhero.images[currentIndex % total].url : null;

  useEffect(() => {
    if (!superhero.images || superhero.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % superhero.images!.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [superhero.images]);

  const { deleteSuperhero } = useSuperheroForm();

  return (
    <article className="w-full h-full overflow-y-scroll snap-y snap-mandatory">
      {/* Section 1 */}
      <section className="relative h-full snap-start justify-center overflow-hidden bg-[#151515] md:bg-white">
        <div className="relative h-full md:h-[600px] w-full md:[clip-path:polygon(0_0,100%_0,100%_90%,0_100%)] overflow-hidden">
          <img
            key={currentIndex}
            src={currentImage || "/explore-no-img.jpg"}
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
        className="h-full snap-start bg-[#151515] flex flex-col items-center justify-start text-white py-10 px-6 md:px-20 gap-3 overflow-y-auto"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-8">
          <img
            src={superhero.images?.[0]?.url || "/explore-no-img.jpg"}
            alt={superhero.nickname}
            className="w-full md:w-1/3 rounded-lg shadow-lg object-cover max-h-80"
          />

          <div className="flex flex-col gap-4 md:w-2/3">
            <h2 className="text-4xl font-bold uppercase">
              {superhero.nickname}
            </h2>
            {superhero.realName && (
              <p className="text-xl font-semibold">
                Real Name: {superhero.realName}
              </p>
            )}
            <p className="text-lg">{superhero.originDescription}</p>
            {superhero.catchPhrase && (
              <p className="italic text-gray-300">"{superhero.catchPhrase}"</p>
            )}
            <p className="font-bold">
              Type:{" "}
              <span
                className={`${
                  superhero.type === "HERO" ? "text-green-400" : "text-red-400"
                }`}
              >
                {superhero.type}
              </span>
            </p>
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-2xl font-bold mb-2">Super Powers:</h3>
          <div className="flex flex-wrap gap-3">
            {superhero.superPowers.map((sp) => (
              <span
                key={sp.id}
                className="px-3 py-1 rounded-full bg-purple-600 text-white font-semibold text-sm"
              >
                {sp.name}
              </span>
            ))}
          </div>
        </div>

        {superhero.images.length > 0 && (
          <div className="w-full mt-6">
            <h3 className="text-2xl font-bold mb-2">Images:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {superhero.images.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={`${superhero.nickname}-${img.id}`}
                  className="rounded-lg object-cover w-full h-40"
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-2 flex gap-4 w-full">
          <Link
            to="/superheroes/$id/edit"
            params={{ id: superhero.id.toString() }}
            className="px-4 py-2 rounded bg-white text-black font-bold hover:bg-gray-700 hover:text-white transition-all text-center whitespace-nowrap"
          >
            Edit
          </Link>

          <button
            onClick={() => deleteSuperhero(superhero.id)}
            className="px-4 py-2 rounded bg-white text-black font-bold hover:bg-red-400 hover:text-white transition-all text-center whitespace-nowrap"
          >
            Delete
          </button>
        </div>
      </section>
    </article>
  );
}
