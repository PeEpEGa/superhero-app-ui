import { useRef, type ChangeEvent } from "react";
import { ImagePlus } from "lucide-react";

interface UploadeImageInputProps {
  handleAddImage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadeImageInput({
  handleAddImage,
}: UploadeImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="w-full h-full aspect-[320/380] flex flex-col items-center justify-center gap-3 cursor-pointer p-2 border-2 border-dashed border-[#212121] rounded-lg box-border"
      onClick={() => fileInputRef.current?.click()}
    >
      <ImagePlus className="text-gray-500" />

      <p className="text-gray-500 text-center max-w-[172px] font-light">
        Drop your image here, or select
        <span
          className="text-blue-900 underline cursor-pointer font-light"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          click to browse
        </span>
      </p>

      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleAddImage}
        multiple
      />
    </div>
  );
}
