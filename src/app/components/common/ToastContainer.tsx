import React from "react";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const ToastContainer = () => {
  return (
    <Toaster>
      {(t) => (
        <div
          className={`bg-retroDark-300 px-4 py-4 shadow-md rounded-md ${
            t.visible ? "animate-fade-in" : "animate-leave"
          }`}
        >
          {t.message && (
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <ToastIcon toast={t} />
                <div className="text-white">{t.message}</div>
              </div>
              <button onClick={() => toast.dismiss(t.id)}>
                <FaXmark className="h-4 w-4  text-gray-400 hover:text-gray-600 transition duration-300 ease-in-out" />
              </button>
            </div>
          )}
        </div>
      )}
    </Toaster>
  );
};

export default ToastContainer;
