import React, { RefObject } from "react";
import Button from "../common/Button";
import useMessages from "@/hooks/useMessages";

interface InputContainerProps {
  handleSend: (event: React.FormEvent) => Promise<void>;
  inputRef: RefObject<HTMLInputElement | null>;
  loadingButton: boolean;
}

const InputContainer: React.FC<InputContainerProps> = ({
  handleSend,
  inputRef,
  loadingButton,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !loadingButton) {
      handleSend(event);
    }
  };

  const { isLoading } = useMessages();

  return (
    <div className="flex-none border-t border-retroDark-200">
      <div className="flex items-center space-x-2 bg-retroDark-100 p-2 rounded-lg">
        <input
          type="text"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 bg-retroDark-300 text-retroText.primary rounded-lg focus:outline-none focus:ring-2 focus:ring-retroDark-accent"
          placeholder="Type a message..."
        />
        <Button onClick={handleSend} loading={loadingButton || isLoading}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default InputContainer;
