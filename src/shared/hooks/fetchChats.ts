import { useEffect, useState } from "react";
import { ChatsData } from "../../entities/MainChatPage/model/types";
import { getChats } from "../../features";

export const useChats = (token: string) => {
    const [chats, setChats] = useState<ChatsData[]>([]);
  
    useEffect(() => {
      const fetchChats = async () => {
        const fetchedChats = await getChats.fetchChats(token);
        setChats(fetchedChats);
      };
  
      fetchChats();
    }, [token]);
  
    return { chats, setChats };
  };