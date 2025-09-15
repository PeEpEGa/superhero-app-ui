import ImageOverlay from "./ImageOverlay";

interface UploadedImageCardProps {
  id: number;
  preview: string;
  deleteImage: (id: number) => void;
  variant: "delete" | "deleteWithModal";
  fileId?: number;
}

export default function UploadedImageCard({
  id,
  preview,
  deleteImage,
  variant,
}: UploadedImageCardProps) {
  return (
    <ImageOverlay variant={variant} onDelete={() => deleteImage(id)}>
      <div className="w-full h-full aspect-[320/380] overflow-hidden border border-gray-300 box-border">
        <img
          src={preview}
          alt={`Image ${id}`}
          className="w-full h-full object-cover"
        />
      </div>
    </ImageOverlay>
  );
}
