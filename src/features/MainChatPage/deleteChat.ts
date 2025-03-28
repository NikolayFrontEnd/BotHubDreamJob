import { client } from "../../shared/api/client";
export const deleteChat = async (chatId: string, token: string) => {
  const response = await client.delete(`/chat/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};