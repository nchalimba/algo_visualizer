import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "./Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  indexTitleOrUrl?: string;
  type: "index" | "conversation";
};

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  indexTitleOrUrl,
  type,
}: Props) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 shadow-lg bg-retroDark-200 p-6 rounded-lg">
          <DialogTitle className="font-bold text-xl text-white">
            Delete {type}?
          </DialogTitle>
          <p className="text-retroText.light">
            This will permanently delete the {type}.
          </p>
          <p className="text-retroText.light">
            Are you sure you want to delete the{" "}
            {type === "conversation" ? "conversation" : indexTitleOrUrl}? All
            data will be permanently removed.
          </p>
          <div className="flex gap-4">
            <Button type="text" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button type="error" onClick={() => onConfirm()}>
              Delete
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
