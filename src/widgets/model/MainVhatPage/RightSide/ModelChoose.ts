import { useState } from "react";
import chatgpt4Icon from "../../../../shared/assets/gpt4.png"
import mjIcon from "../../../../shared/assets/mj-white.png"
import chatPhoto from '../../../../shared/assets/gpt3.5.png'

export const useModelChoose = () => {
    const [isModelsBlockOpen, setModelsBlockOpen] = useState(false);
    const [currentModel, setCurrentModel] = useState('ChatGPT');
    const [currentIcon, setCurrentIcon] = useState(chatPhoto);
    const handleModelSelect = (modelName: string) => {
      setCurrentModel(modelName);
      setModelsBlockOpen(false);
    };
      const openModelPannel = () =>{
       setModelsBlockOpen(!isModelsBlockOpen);
      } 

      const models = [
        { name: 'ChatGPT', icon: chatPhoto },
        { name: 'DALL-E', icon: chatgpt4Icon },
        { name: 'Midjourney', icon: mjIcon }
      ];

return {handleModelSelect, openModelPannel, models, currentModel, currentIcon, setCurrentIcon, isModelsBlockOpen};
};