import type { ChangeEvent, Dispatch, DragEvent, SetStateAction } from "react";

import UploadeImageInput from "./UploadImageInput";
import UploadedImageCard from "./UploadImageCard";
import type { ImageData } from "../../types";

interface UploadedImagesContainerProps {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  setImagesError: Dispatch<SetStateAction<string>>;
  imagesError: string;
}

export default function UploadedImagesContainer({
  images,
  setImages,
  setImagesError,
  imagesError,
}: UploadedImagesContainerProps) {
  const MAX_IMAGES = 7;

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (images.length + files.length > MAX_IMAGES) {
      setImagesError(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    setImagesError("");

    const remainingSlots = MAX_IMAGES - images.length;
    const validFiles = Array.from(files).slice(0, remainingSlots);

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length + images.length > MAX_IMAGES) {
      setImagesError(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    setImagesError("");

    const remainingSlots = MAX_IMAGES - images.length;
    const validFiles = files.slice(0, remainingSlots);

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const deleteImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col w-full max-w-[690px]">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 xl:gap-6 relative pb-7"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {images.map(({ preview }, id) => (
          <UploadedImageCard
            key={preview}
            id={id}
            preview={preview}
            deleteImage={deleteImage}
            variant={preview.startsWith("blob") ? "delete" : "deleteWithModal"}
          />
        ))}

        {images.length < MAX_IMAGES && (
          <UploadeImageInput handleAddImage={handleAddImage} />
        )}

        {imagesError && (
          <p className="absolute bottom-0 left-2 text-sm text-blue-700">
            {imagesError}
          </p>
        )}
      </div>
    </div>
  );
}
