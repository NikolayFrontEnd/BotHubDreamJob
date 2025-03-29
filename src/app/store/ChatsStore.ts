import { action, makeAutoObservable, observable } from "mobx";
import { createChat, deleteChat, getChats } from "../../features";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNjBhOTAxLWJiMzYtNDIzZS05NGQ1LWVmMzM5YTcxMDQwNSIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3NDAwNjA3NDEsImV4cCI6MjA1NTYzNjc0MX0.JYrAECA8EpzptOqtKIyq7gJWf83hburC9S25yF5Xt3k";

interface ChatsStore{
    id:string,
    name:string,
    groupId?:string |null,
    model_id?:string |null
  }
  
  class ChatsStore{
    chats: ChatsStore[] = [];
    isLoad: boolean = false; 
    error: string | null = null;
    selectedChatId: string = "";
    
    constructor(){
      makeAutoObservable(this,{
        chats: observable,
        isLoad:observable,
        error:observable,
        selectedChatId: observable,
        fetchChats:action,
        deleteChat:action,
        createChat:action,
        selectChat: action,
        setLoading: action,
        setError: action,
        setChats: action,
        removeChat: action,
        addChat: action
      })
    }
    
    setLoading = (loading: boolean) => {
      this.isLoad = loading;
    }
    
    setError = (error: string | null) => {
      this.error = error;
    }
    
    setChats = (chats: ChatsStore[]) => {
      this.chats = chats;
    }
    
    removeChat = (chatId: string) => {
      this.chats = this.chats.filter(chat => chat.id !== chatId);
    }
    
    addChat = (chat: ChatsStore) => {
      this.chats = [...this.chats, chat];
    }
    
    fetchChats = async () => {
      try {
        this.setLoading(true);
        this.setError(null);
        
        const data = await getChats.fetchChats(token);
        
        this.setChats(data);
        return data;
      } catch (error) {
        this.setError("Ошибка полчить чаты!");
        console.error("Ошибка получения чатов:", error);
      } finally {
        this.setLoading(false);
      }
    }
  
    deleteChat = async (chatId: string) => {
      try {
        this.setLoading(true);
        this.setError(null);
        
        await deleteChat(chatId, token);
        
        this.removeChat(chatId);
        return true;
      } catch (error) {
        this.setError("Ошибка возникла при удалении чата");
        console.error("Ошибка удаления чата:", error);
        return false;
      } finally {
        this.setLoading(false);
      }
    }
  
    createChat = async (chatName: string) => {
      try {
        this.setLoading(true);
        this.setError(null);
        
        const newChat = await createChat(chatName, token);
        
        this.addChat(newChat);
        return newChat;
      } catch (error) {
        this.setError("Ошибка создать чат!");
        console.error("Ошибка создания чата:", error);
        return null;
      } finally {
        this.setLoading(false);
      }
    }
  
    selectChat = (chatId: string) => {
      this.selectedChatId = chatId;
    }
  }

const chatsStore = new ChatsStore();
export default chatsStore;