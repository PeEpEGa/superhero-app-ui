import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateSuperheroPayload } from "../types/superhero.interface";
import {
  handleSuperheroCreation,
  handleSuperheroUpdate,
} from "../services/superhero.service";
import type { ImageData } from "../../../shared/types/index";
import { deleteSuperheroById } from "../client/superhero.api";
import { useNavigate } from "@tanstack/react-router";

export function useSuperheroForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const deleteSuperheroMutation = useMutation({
    mutationFn: (id: number) => deleteSuperheroById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superheroes"] });
      navigate({ to: "/superheroes/paginated", search: { page: 1, limit: 5 } });
    },
  });

  return {
    createSuperhero: createSuperheroMutation.mutate,
    updateSuperhero: updateSuperheroMutation.mutate,
    deleteSuperhero: deleteSuperheroMutation.mutate,
    isCreating: createSuperheroMutation.isPending,
    error: createSuperheroMutation.error,
  };
}
