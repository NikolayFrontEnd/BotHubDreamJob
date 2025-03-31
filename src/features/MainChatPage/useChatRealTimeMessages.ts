import { useEffect } from "react";
import chatsStore from "../../app/store/ChatsStore";
import messagesStore from "../../app/store/Messagesstore";

export const useChatMessages = () => {
    useEffect(() => {
      if (chatsStore.selectedChatId) {
        console.log("Starting message stream for chat:", chatsStore.selectedChatId);
        messagesStore.startMessageStream(chatsStore.selectedChatId);
        
        return () => {
          console.log("Stopping message stream");
          messagesStore.stopMessageStream();
        };
      }
    }, [chatsStore.selectedChatId]);
  
    const formatTime = (dateString: any) => {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
  

    const reversedMessages = [...messagesStore.messages].reverse();
  
    return {
      messages: reversedMessages,
      formatTime
    };
  };