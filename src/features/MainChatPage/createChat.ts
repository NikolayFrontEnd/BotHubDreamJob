import { client } from "../../shared/api/client";

export const createChat = async (chatName: string, token: string) => {
  const response = await client.post(
    "/chat",
    { name: chatName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};