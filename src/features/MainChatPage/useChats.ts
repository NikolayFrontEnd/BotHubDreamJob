import { useEffect } from "react";
import chatsStore from "../../app/store/ChatsStore";
import messagesStore from "../../app/store/Messagesstore";


export const useFetchChats = () => {
  useEffect(() => {
      chatsStore.fetchChats();
  }, []);
};

export const useHandleChatClick = () => {
  const handleChatClick = (id: string) => {
    chatsStore.selectChat(id);
    messagesStore.fetchMessage(id);
  };

  return handleChatClick;
};