import { ChatMessage, ChatResponse } from "@/app/types";
import apiClient from "./client";

export const getMessages = async () => {
  const response = await apiClient.get("/message/");
  return response.data as ChatMessage[];
};

export const deleteMessages = async () => {
  const response = await apiClient.delete("/message/");
  return response.data;
};

export const sendMessage = async (message: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "chat/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: message }),
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response;
};

export const handleMessageStream = async (
  response: Response,
  onMessage: (message: string) => void,
  onFinish?: () => void
) => {
  if (!response.body) throw new Error("Network response body was not ok");
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break; // Exit the loop if the stream is finished

    const chunk = decoder.decode(value, { stream: true });
    const jsonObjects = chunk.split("\n");
    jsonObjects.forEach((jsonString) => {
      if (jsonString) {
        const response = JSON.parse(jsonString) as ChatResponse;
        if (response.error) throw new Error(response.error);

        onMessage(response.text);
      }
    });
  }
  onFinish?.();
};
