
import styles from '../../../pages/MainChat/ui/MainChatPage.module.css';
import vector from "../../../shared/assets/Vector.png"
import send from "../../../shared/assets/Group.png"
import copy from "../../../shared/assets/copy.png"
import userPhoto from '../../../shared/assets/userPhoto.png'
import { useModelChoose } from '../../model/MainVhatPage/RightSide/ModelChoose';
import { RightSideProps } from '../../../entities/MainChatPage/model/types';
import chatsStore from '../../../app/store/ChatsStore';
import { observer } from 'mobx-react';
import { useMessageSending } from '../../../features/MainChatPage/useMessageSending';
import { useChatMessages } from '../../../features/MainChatPage/useChatRealTimeMessages';


export const RightSide: React.FC<RightSideProps> = ({rightBlockRef}) => {
const {handleModelSelect, openModelPannel, models, currentModel, currentIcon, setCurrentIcon, isModelsBlockOpen} = useModelChoose();
   

const InputBlock = observer(() =>{

  const formAction = useMessageSending();


  return(
    <>
        <div className={styles.lowBlock}>
  
  {isModelsBlockOpen && (
        <div className={styles.modelSwitcher}>
          {models.map((model) => (
            <div 
              key={model.name}
              className={`${styles.chatItem} ${
                currentModel === model.name ? styles.activeBlock : ''
              }`}
              onClick={() => {
                handleModelSelect(model.name);
                setCurrentIcon(model.icon);
              }
               }
            >
              <div>
                <img 
                  className={styles.botIcon} 
                  src={model.icon} 
                  alt={model.name} 
                />
              </div>
              <div>{model.name}</div>
            </div>
          ))}
        </div>
      )}


    <div className={styles.chooseIntellect}>
      <div className={styles.botBlock}>  
      <img src={currentIcon} className={styles.botIcon}/>
      <span className={styles.botName}>{currentModel}</span>
      </div>
    <div className={styles.dropDownBlock} onClick = {openModelPannel}>    <img src={vector} className={styles.dropdownIcon}/>  </div> 
    </div>

 { chatsStore.selectedChatId === "" ?  <div className={styles.noChatMessage}>
  Создайте чат или выберите существующий!

</div> : <form action = {formAction} className={styles.inputContainer}>
  <input 
    placeholder='Введите что-нибудь...' 
    className={styles.messageInput}
    name="message"
  />
  <button type = "submit" className={styles.sendBtn}>
    <img src={send} className={styles.sendIcon}/>
  </button>
</form>

} 

  </div>
    </>
  )
})

const ChatComponent = observer(() => {

  const { messages, formatTime } = useChatMessages();

  return (
    <>
    
      {messages.map((message) => {

        if (message.role === "user") {
          return (
            <div key={message.id} className={styles.userMessage}>
              <img src={copy} className={styles.messageAction} />
              <div className={styles.usermesblock}>
                <div className={styles.messageText}>{message.content}</div>
                <div className={styles.messageTime}>
                  {formatTime(message.created_at)}
                </div>
              </div>
              <img src={userPhoto} className={styles.userAvatar} />
            </div>
          );
        } else if (message.role === "assistant") {
          return (
            <div key={message.id} className={styles.botMessage}>
              <div className={styles.typeIntellect}>
                <span>Chat gpt</span>
                <span className={styles.nameModel}>{message.model_id || "gpt-3.5-turbo"}</span>
              </div>
              
              <div className={styles.botmess}>
                <div>
                  <img src={currentIcon} className={styles.botAvatar} />
                </div>
                <div className={styles.messageContent}>
                  {message.content}
                </div>
              </div>
              
              <div className={styles.limit}>
                <div className={styles.limSection}>
                  <span className={styles.limNumber}>
                  <span className={styles.limNumber}>-223 CAPS</span>
                  </span>
                  <div className={styles.messageAction}>
                    <img src={copy} />
                  </div>
                </div>
                <div className={styles.messageTime}>
                  <span>{formatTime(message.created_at)}</span>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}

    </>
  );
});

    return (
       <>
    <div  ref={rightBlockRef}  className={styles.rightBlock}>
    <div className={styles.topBlock}>
    <ChatComponent/>
    </div>
  {/* Нижний блок UI */}
<InputBlock/>
  </div>


       </> 
    )
}
