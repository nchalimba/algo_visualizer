import { getMessages } from "@/api/message";
import { useQuery } from "@tanstack/react-query";

const useMessages = () => {
  const {
    data: messages,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
  return { messages, isError, error, isLoading };
};

export default useMessages;
