import { createPortal } from "react-dom";

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  header: string;
  text: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onDelete,
  header,
  text,
}: DeleteModalProps) {
  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[4000] bg-gray-100/90 flex items-center justify-center p-3">
      <div className="relative w-full max-w-[656px] bg-white rounded-lg p-6 flex flex-col gap-6 md:gap-14 outline-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-7 right-6 w-8 h-8 flex items-center justify-center"
        >
          {/* <CloseIcon /> */}
        </button>

        {/* Header */}
        <h2 className="pr-8 md:pr-6 font-medium text-[30px] md:text-[45px]">
          {header}
        </h2>

        {/* Text */}
        <p className="text-[#5C5C5C] font-light text-sm">{text}</p>

        <div className="border-t border-gray-300"></div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 md:gap-7">
          <button className="h-10 md:h-[60px]" onClick={onClose}>
            Cancel
          </button>
          <button className="h-10 md:h-[60px]" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
