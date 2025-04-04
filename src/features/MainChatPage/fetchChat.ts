import { client } from "../../shared/api/client";

export const getChats = {
  async fetchChats(token: string) {
    try {
      const response = await client.get("/chat/list", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Все чаты:",response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Ошибка при получении чатов:", error);
      return [];
    }
  },
};

