import { client } from "../../shared/api/client";

export  const receiveAllMessages =async (id:string) =>{
    try {
        const response = await client.get(
          `/message/list?chatId=${id}`,
          {
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNjBhOTAxLWJiMzYtNDIzZS05NGQ1LWVmMzM5YTcxMDQwNSIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3NDAwNjA3NDEsImV4cCI6MjA1NTYzNjc0MX0.JYrAECA8EpzptOqtKIyq7gJWf83hburC9S25yF5Xt3k',
              'Content-Type': 'application/json'
            }
          }
        );
        console.log('Все сообщения', response.data)
        return response.data.data;
      } catch (error) {
        console.error('Ошибка получения всех сообщений!:', error);
        return [];
      }
}