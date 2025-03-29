import { useActionState, useState } from "react";
import chatsStore from "../../../../app/store/ChatsStore";

export const useChatChange = () => {
const handleDeleteChat = async (id:string) => {
          await chatsStore.deleteChat(id);
      }
const [openInput, setOpenInput] = useState<boolean>(false);
 const openChat = () =>{
    setOpenInput(!openInput);
    return{ openInput, setOpenInput};
   };

     const action = async (_: any, formData: FormData) => {
        const chatName = formData.get("chatName") as string;
       await chatsStore.createChat(chatName);
       setOpenInput(false);
        return chatName;
      }; 

const [_, formAction] = useActionState(action, ""); 
return { handleDeleteChat, openChat, openInput, formAction};
};