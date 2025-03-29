import { client } from "../../shared/api/client";

export  const sendUserMessage =async (chatId: string, token: string, message: string) =>{
     const response = await client.post(
        "/message/send",
        { chatId: chatId ,
  message: message,
tgBotMessageId: "string",
  platform: "MAIN"},
        {

          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
}