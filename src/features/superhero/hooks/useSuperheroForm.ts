import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateSuperheroPayload } from "../types/superhero.interface";
import { handleSuperheroCreation } from "../services/superhero.service";
import type { ImageData } from "../../../shared/types/index";

export function useSuperheroForm() {
  const queryClient = useQueryClient();

  const createSuperheroMutation = useMutation({
    mutationFn: ({
      superhero,
      images,
    }: {
      superhero: CreateSuperheroPayload;
      images: ImageData[];
    }) => handleSuperheroCreation({ superhero, images }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superheroes"] });
    },
  });

  return {
    createSuperhero: createSuperheroMutation.mutate,
    isCreating: createSuperheroMutation.isPending,
    error: createSuperheroMutation.error,
  };
}
