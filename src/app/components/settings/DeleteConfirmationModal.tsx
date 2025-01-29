import React from "react";
import Button from "../common/Button";
import { FaXmark } from "react-icons/fa6";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  indexTitleOrUrl: string;
};

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  indexTitleOrUrl,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-retroDark-200 p-3 rounded shadow-lg z-50">
        <div className="flex items-center justify-between p-4 border-b rounded-t gap-4">
          <h3 className="text-xl font-semibold">Confirm Deletion</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 rounded-lg p-2 inline-flex justify-center items-center"
          >
            <FaXmark className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4 flex flex-col items-center">
          <p>Delete the index?</p>
          <p className="font-bold">{indexTitleOrUrl}</p>
        </div>
        <div className="flex justify-end p-4 border-t gap-4">
          <Button onClick={onConfirm} error>
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
