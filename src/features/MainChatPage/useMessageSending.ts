import { useActionState } from "react";
import chatsStore from "../../app/store/ChatsStore";
import messagesStore from "../../app/store/Messagesstore";

export const useMessageSending = () => {
    const action = (_: any, formData: FormData) => {
      const mess = formData.get("message");
      console.log(mess);
      
      if (mess) {
        messagesStore.sendMessage(chatsStore.selectedChatId, mess.toString());
      }
      
      return mess;
    };
    
    const [_, formAction] = useActionState(action, "");
    
    return formAction;
  };