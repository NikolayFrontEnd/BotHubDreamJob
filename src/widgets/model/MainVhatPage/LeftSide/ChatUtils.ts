import { useState } from "react";
import { createChat, deleteChat, getChats } from "../../../../features";
import { useChats } from "../../../../shared/hooks/fetchChats";
import { useFormState } from "react-dom";

export const useChatChange = (token:string) => {

const {chats, setChats}  = useChats(token);
const handleDeleteChat = async (chatId: string) => {
        try {
          await deleteChat(chatId, token);
          const updatedChats = await getChats.fetchChats(token);
          setChats(updatedChats);
        } catch (error) {
          console.error("Chat deletion failed:", error);
        }
      }

const [openInput, setOpenInput] = useState<boolean>(false);
 const openChat = () =>{
    setOpenInput(!openInput);
    return{ openInput, setOpenInput};
   };

     const action = async (_: any, formData: FormData) => {
        const chatName = formData.get("chatName") as string;
        try {
          const newChat = await createChat(chatName, token);
          setChats(prevChats => [...prevChats, newChat]);
          setOpenInput(false);
        } catch (error) {
          console.error("Ошибка при создании чата:", error);
        }
        return chatName;
      }; 

const [_, formAction] = useFormState(action, ""); 

return {chats, handleDeleteChat, openChat, openInput, formAction};

};