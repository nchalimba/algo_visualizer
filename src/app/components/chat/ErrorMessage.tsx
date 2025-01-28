import React from "react";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="bg-alert bg-opacity-10 border border-alert text-alert p-4 rounded my-5 font-bold">
      {message}
    </div>
  );
};

export default ErrorMessage;
