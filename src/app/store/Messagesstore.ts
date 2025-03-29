import { action, makeAutoObservable, observable } from "mobx";
import { sendUserMessage } from "../../features/MainChatPage/sendMessage";
import { receiveAllMessages } from "../../features/MainChatPage/receiveMessages";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNjBhOTAxLWJiMzYtNDIzZS05NGQ1LWVmMzM5YTcxMDQwNSIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3NDAwNjA3NDEsImV4cCI6MjA1NTYzNjc0MX0.JYrAECA8EpzptOqtKIyq7gJWf83hburC9S25yF5Xt3k";

interface MessagessStore{
    id:string,
    role:string,
    content:string,
    model_id:string,
    chat_id:string,
    created_at:string,
}

class MessagesStore{
messages: MessagessStore[] = [];
isLoad: boolean = false; 
error: string | null = null;
    constructor(){
        makeAutoObservable(this,{
messages: observable,
isLoad:observable,
error:observable,
fetchMessage:action,
sendMessage:action,
        })
    }
    sendMessage = async (chatId: string, message: string) => {
        this.isLoad = true;
        this.error = null;
        try {
        const response =  await sendUserMessage(chatId, token, message);
          console.log("Все получилось!",response.data)
          return true;
        } catch (error) {
          this.error = "Ошибка при отправке сообщения";
          console.error("Ошибка отправки сообщения:", error);
          return false;
        } finally {
          this.isLoad = false;
        }
      }


    fetchMessage = async (id:string) =>{
        this.isLoad = true;
        this.error = null;
        try{ 
            const data = await receiveAllMessages(id);
        this.messages = data;
            return data;

                  } catch (error) {
                    this.error = "Ошибка при получения сообщений";
                    console.error("Ошибка получения сообщений:", error);
                  } finally {
                    this.isLoad = false;
                  }
    }

    }
const messagesStore = new MessagesStore();
export default messagesStore;