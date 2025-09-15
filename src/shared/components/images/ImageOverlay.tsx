import React, { useState } from "react";
import { createPortal } from "react-dom";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { Trash } from "lucide-react";

interface ImageOverlayProps {
  children: React.ReactNode;
  variant: "delete" | "deleteWithModal" | "addToCart";
  onDelete?: () => void;
}

export default function ImageOverlay({
  children,
  variant,
  onDelete,
}: ImageOverlayProps) {
  const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (variant === "delete") {
      onDelete?.();
    }
    if (variant === "deleteWithModal") {
      setIsDeleteImageModalOpen(true);
    }
  };

  return (
    <div className="relative inline-block w-full group">
      {/* Overlay background */}
      {(variant === "delete" || variant === "deleteWithModal") && (
        <div className="absolute inset-0 bg-black/35 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      )}

      {children}

      {/* Overlay Button */}
      <button
        onClick={handleClick}
        aria-label="Delete Image"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/75 shadow-md rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-white hover:shadow-lg"
      >
        <Trash />
      </button>

      {/* Delete Confirmation Modal */}
      {isDeleteImageModalOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <DeleteConfirmationModal
            isOpen={true}
            onClose={() => setIsDeleteImageModalOpen(false)}
            onDelete={() => onDelete?.()}
            header="Are you sure to delete image?"
            text="This image will be permanently removed. Please confirm if you want to proceed with deletion."
          />,
          document.body
        )}
    </div>
  );
}
