import { addSuperheroImages, createSuperhero } from "../client/superhero.api";
import type { CreateSuperheroPayload } from "../types/superhero.interface";
import type { ImageData } from "../../../shared/types/index";

interface CreateSuperheroOptions {
  superhero: CreateSuperheroPayload;
  images: ImageData[];
}

export async function handleSuperheroCreation({
  superhero,
  images,
}: CreateSuperheroOptions) {
  try {
    const newSuperhero = await createSuperhero(superhero);

    if (images.length > 0) {
      await addSuperheroImages(
        newSuperhero.id,
        images.map((imageData) => ({ file: imageData.file! }))
      );
    }

    return newSuperhero;
  } catch (error) {
    throw new Error("Failed to create a new superhero");
  }
}
