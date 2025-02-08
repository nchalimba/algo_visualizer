import { Transition } from "@headlessui/react";
import { Toaster, ToastIcon, toast } from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const ToastContainer = () => {
  return (
    <Toaster position="top-center">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <div className="transform p-4 flex items-center justify-between gap-5 bg-retroDark-300 rounded shadow-lg">
            <div className="flex items-center gap-3">
              <ToastIcon toast={t} />
              <div className="text-white">{t.message}</div>
            </div>
            <button onClick={() => toast.dismiss(t.id)}>
              <FaXmark className="h-4 w-4  text-gray-400 hover:text-gray-600 transition duration-300 ease-in-out" />
            </button>
          </div>
        </Transition>
      )}
    </Toaster>
  );
};

export default ToastContainer;
