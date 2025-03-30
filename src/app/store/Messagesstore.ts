import { action, makeAutoObservable, observable } from "mobx";
import { sendUserMessage } from "../../features/MainChatPage/sendMessage";
import { receiveAllMessages } from "../../features/MainChatPage/receiveMessages";
import { fetchEventSource } from "@microsoft/fetch-event-source";

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
streamController: AbortController | null = null;

    constructor(){
        makeAutoObservable(this,{
messages: observable,
isLoad:observable,
error:observable,
fetchMessage:action,
sendMessage:action,
startMessageStream: action,
stopMessageStream: action,
addMessage: action,
updateMessage: action,
        })
    }
    sendMessage = async (chatId: string, message: string) => {
      this.isLoad = true;
      this.error = null;
      try {
        const response = await sendUserMessage(chatId, token, message);
        console.log("Message sent successfully:", response.data);
        
        // Refresh messages after sending
        await this.fetchMessage(chatId);
        
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

    addMessage = (message: MessagessStore) => {
      this.messages = [...this.messages, message];
    }
    
    updateMessage = (updatedMessage: MessagessStore) => {
      this.messages = this.messages.map(msg => 
        msg.id === updatedMessage.id ? updatedMessage : msg
      );
    }
    
    startMessageStream = (chatId: string) => {
      if (!chatId) {
        console.log("Cannot start stream: No chat ID provided");
        return;
      }
      
      console.log("Starting SSE connection for chat:", chatId);
      this.stopMessageStream();
      
      this.streamController = new AbortController();
      const { signal } = this.streamController;
      
      const apiUrl = `https://bothubq.com/api/v2/chat/${chatId}/stream`;
      console.log("Connecting to SSE endpoint:", apiUrl);
      
      fetchEventSource(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache'
        },
        onopen: async (response) => {
          console.log("SSE connection opened with status:", response.status);
          console.log("Content-Type:", response.headers.get('content-type'));
          
          if (response.ok) {
            console.log("SSE connection established successfully");
            return;
          }
          throw new Error(`Failed to establish SSE connection: ${response.status}`);
        },
        onmessage: (event) => {
          console.log("SSE message received:", event.data);
          try {
            const data = JSON.parse(event.data);
            console.log("Parsed SSE data:", data);
    
            if (data.name === 'MESSAGE_UPDATE' && data.data && data.data.message) {
              console.log("Updating message:", data.data.message);
              
              const existingMessage = this.messages.find(msg => msg.id === data.data.message.id);
              
              if (existingMessage) {
                this.updateMessage({
                  ...existingMessage,
                  content: data.data.message.content
                });
              } else {
                this.addMessage({
                  id: data.data.message.id,
                  content: data.data.message.content,
                  role: 'assistant',
                  model_id: 'gpt-3.5-turbo',
                  chat_id: chatId,
                  created_at: new Date().toISOString()
                });
              }
            } else if (data.name === 'NEW_MESSAGE' && data.data && data.data.message) {
              console.log("Adding new message:", data.data.message);
              this.addMessage({
                id: data.data.message.id,
                content: data.data.message.content,
                role: data.data.message.role || 'assistant',
                model_id: data.data.message.model_id || 'gpt-3.5-turbo',
                chat_id: chatId,
                created_at: data.data.message.created_at || new Date().toISOString()
              });
            } else {
              console.log("Received message with name:", data.name);
            }
          } catch (error) {
            console.error('Error parsing SSE message:', error);
          }
        },
        onerror: (err) => {
          console.error('SSE error:', err);
        },
        signal
      }).catch(err => {
        if (err.name !== 'AbortError') {
          console.error('SSE connection error:', err);
        }
      });
    }
    
    stopMessageStream = () => {
      if (this.streamController) {
        this.streamController.abort();
        this.streamController = null;
      }
    }

    }
const messagesStore = new MessagesStore();
export default messagesStore;