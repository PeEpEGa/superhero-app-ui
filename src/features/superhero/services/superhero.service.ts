import {
  addSuperheroImages,
  createSuperhero,
  deleteSuperheroImage,
  updateSuperhero,
} from "../client/superhero.api";
import type { CreateSuperheroPayload } from "../types/superhero.interface";
import type { ImageData } from "../../../shared/types/index";

interface CreateSuperheroOptions {
  superhero: CreateSuperheroPayload;
  images: ImageData[];
}

interface UpdateSuperheroOptions {
  id: number;
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

export async function handleSuperheroUpdate({
  id,
  superhero,
  images,
}: UpdateSuperheroOptions) {
  try {
    const updatedSuperhero = await updateSuperhero(id, superhero);

    const originalImageIds = updatedSuperhero.images.map((img) => img.id);
    const currentImageIds = images.filter((img) => img.id).map((img) => img.id);

    const imagesToDelete = originalImageIds.filter(
      (imgId) => !currentImageIds.includes(imgId)
    );

    await Promise.all(
      imagesToDelete.map((id) => deleteSuperheroImage(updatedSuperhero.id, id))
    );

    const newImages = images.filter((img) => img.file && !img.id);
    if (newImages.length > 0) {
      await addSuperheroImages(
        updatedSuperhero.id,
        newImages.map((img) => ({ file: img.file! }))
      );
    }

    return updatedSuperhero;
  } catch (error) {
    throw new Error("Failed to create a new superhero");
  }
}
