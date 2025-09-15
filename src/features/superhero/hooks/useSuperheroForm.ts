import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateSuperheroPayload } from "../types/superhero.interface";
import {
  handleSuperheroCreation,
  handleSuperheroUpdate,
} from "../services/superhero.service";
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

  const updateSuperheroMutation = useMutation({
    mutationFn: ({
      id,
      superhero,
      images,
    }: {
      id: number;
      superhero: CreateSuperheroPayload;
      images: ImageData[];
    }) => handleSuperheroUpdate({ id, superhero, images }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["superheroes"] });
      queryClient.invalidateQueries({ queryKey: ["superhero", id] });
    },
  });

  return {
    createSuperhero: createSuperheroMutation.mutate,
    updateSuperhero: updateSuperheroMutation.mutate,
    isCreating: createSuperheroMutation.isPending,
    error: createSuperheroMutation.error,
  };
}
