import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type {
  CreateSuperheroPayload,
  Superhero,
} from "../types/superhero.interface";
import { createSuperheroSchema } from "../schemas/superhero.schema";
import { useEffect, useState } from "react";
import { getAllSuperPowers } from "../../super-power/client/superPower.api";
import UploadedImagesContainer from "../../../shared/components/images/UploadImagesContainer";
import { useSuperheroForm } from "../hooks/useSuperheroForm";
import type { SuperPower } from "../../super-power/types/superPower.type";

interface ImageData {
  file?: File;
  preview: string;
  id?: number;
}

export default function SuperheroForm({
  superhero,
}: {
  superhero?: Superhero;
}) {
  const superheroForm = useForm<CreateSuperheroPayload>({
    resolver: zodResolver(createSuperheroSchema),
    defaultValues: {
      nickname: "",
      realName: "",
      originDescription: "",
      catchPhrase: "",
      type: "HERO",
      superPowers: { superPowerIdsToAdd: [], newSuperPowers: [] },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = superheroForm;

  const { createSuperhero, updateSuperhero, isCreating } = useSuperheroForm();

  useEffect(() => {
    if (superhero) {
      const formSuperPowers = {
        superPowerIdsToAdd: superhero.superPowers?.map((sp) => sp.id) || [],
        newSuperPowers: [],
      };

      reset({
        nickname: superhero.nickname,
        realName: superhero.realName || "",
        originDescription: superhero.originDescription,
        catchPhrase: superhero.catchPhrase || "",
        type: superhero.type,
        superPowers: formSuperPowers,
      });

      setImages(
        superhero.images.map((image) => ({
          preview: image.url,
          id: image.id,
        })) || []
      );
    }
  }, [superhero, reset]);

  const onSubmit = handleSubmit((data) => {
    try {
      if (superhero) {
        updateSuperhero({ id: superhero.id, superhero: data, images });
      } else {
        createSuperhero({ superhero: data, images });
      }

      reset();
      setNewSuperPowers([]);
      setImages([]);
      setNewSuperPowerInput("");
      setSuperPowers([]);
    } catch (error) {
      console.error("Failed to submit superhero:", error);
    }
  });

  const [superPowers, setSuperPowers] = useState<SuperPower[]>([]);
  useEffect(() => {
    async function fetchSuperPowers() {
      const superPowers = await getAllSuperPowers();
      setSuperPowers(superPowers);
    }

    fetchSuperPowers();
  }, []);

  const addExistingSuperPower = (id: number) => {
    const selectedIds = watch("superPowers.superPowerIdsToAdd") || [];
    const newIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    setValue("superPowers.superPowerIdsToAdd", newIds, {
      shouldValidate: true,
    });
  };

  const [newSuperPowers, setNewSuperPowers] = useState<{ name: string }[]>([]);
  const addNewSuperPower = (name: string) => {
    if (!name.trim()) return;

    if (newSuperPowers.some((superPower) => superPower.name === name)) {
      return;
    }
    const updated = [...newSuperPowers, { name }];
    setNewSuperPowers(updated);
    setValue("superPowers.newSuperPowers", updated, { shouldValidate: true });
  };

  const removeSuperPower = (name: string) => {
    const filtered = newSuperPowers.filter(
      (superPower) => superPower.name !== name
    );
    setNewSuperPowers(filtered);
    setValue("superPowers.newSuperPowers", filtered, { shouldValidate: true });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredSuperPowers = superPowers.filter((sp) =>
    sp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [newSuperPowerInput, setNewSuperPowerInput] = useState("");

  const [images, setImages] = useState<ImageData[]>([]);
  const [imagesError, setImagesError] = useState<string>("");

  return (
    <form onSubmit={onSubmit} className="min-h-full p-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="nickname" className="text-white">
              Nickname:
            </label>
            <input
              id="nickname"
              type="text"
              {...register("nickname")}
              className="bg-[#212121] w-full placeholder-neutral-500 font-bold focus:outline-none text-white p-2 rounded-md"
              placeholder="Spider-man"
            />
            <p className="text-red-400">{errors.nickname?.type}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="realName" className="text-white">
              Real Name:
            </label>
            <input
              id="realName"
              type="text"
              {...register("realName")}
              className="bg-[#212121] w-full placeholder-neutral-500 font-bold focus:outline-none text-white p-2 rounded-md"
              placeholder="Peter Parker"
            />
            <p className="text-red-400">{errors.realName?.type}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="originDescription" className="text-white">
              Origin Description:
            </label>
            <textarea
              id="originDescription"
              {...register("originDescription")}
              className="bg-[#212121] w-full placeholder-neutral-500 font-bold focus:outline-none text-white p-2 rounded-md resize-none"
              placeholder="Enter origin description..."
              rows={4}
            />
            <p className="text-red-400">{errors.originDescription?.type}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="catchPhrase" className="text-white">
              Catch Phrase:
            </label>
            <textarea
              id="catchPhrase"
              {...register("catchPhrase")}
              className="bg-[#212121] w-full placeholder-neutral-500 font-bold focus:outline-none text-white p-2 rounded-md resize-none"
              placeholder="Enter catch phrase..."
              rows={4}
            />
            <p className="text-red-400">{errors.catchPhrase?.type}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="type" className="text-white">
              Type:
            </label>
            <select
              id="type"
              className="appearance-none bg-[#212121] w-full placeholder-neutral-500 font-bold focus:outline-none text-white p-2 rounded-md"
            >
              <option value="HERO">Hero</option>
              <option value="VILLAIN">Villain</option>
            </select>
            <p className="text-red-400">{errors.type?.type}</p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-white">Type New Super Power:</p>
            <input
              type="text"
              placeholder="Regeneration"
              className="bg-[#212121] placeholder-neutral-500 font-bold focus:outline-none w-full text-white p-2 rounded-md"
              value={newSuperPowerInput}
              onChange={(e) => setNewSuperPowerInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNewSuperPower(newSuperPowerInput);
                  setNewSuperPowerInput("");
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              {newSuperPowers.map((superPower, ind) => {
                return (
                  <div
                    key={ind}
                    onClick={() => removeSuperPower(superPower.name)}
                    className={`py-1 px-2 border rounded w-fit cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-black bg-white text-black`}
                  >
                    {superPower.name}
                  </div>
                );
              })}
            </div>

            <p className="text-white">Or select from existing: </p>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search:"
              className="bg-[#212121] placeholder-neutral-500 font-bold focus:outline-none w-full text-white p-2 rounded-md"
            />
            <div className="flex flex-wrap gap-2">
              {filteredSuperPowers.map((superPower) => {
                const selectedIds =
                  watch("superPowers.superPowerIdsToAdd") || [];
                const isSelected = selectedIds.includes(superPower.id);

                return (
                  <div
                    key={superPower.id}
                    onClick={() => addExistingSuperPower(superPower.id)}
                    className={`bg-[#212121] py-1 px-2 rounded w-fit cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-black ${isSelected ? "bg-white text-black" : "text-white"}`}
                  >
                    {superPower.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <UploadedImagesContainer
            images={images}
            setImages={setImages}
            imagesError={imagesError}
            setImagesError={setImagesError}
          />
        </div>
      </div>
      <button
        disabled={isCreating}
        className="px-4 py-2 rounded-md border w-full md:w-[25%] bg-white text-black hover:bg-[#212121] hover:text-white hover:border-transparent transition-all duration-300"
      >
        {isCreating ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
