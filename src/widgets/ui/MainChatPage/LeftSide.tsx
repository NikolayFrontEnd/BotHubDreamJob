import styles from '../../../pages/MainChat/ui/MainChatPage.module.css';
import logo from "../../../shared/assets/logo.png";
import lang from '../../../shared/assets/lang.png'
import vector from "../../../shared/assets/Vector.png"
import add from "../../../shared/assets/add-chat.png"
import search from "../../../shared/assets/Subtract.png"
import chat from "../../../shared/assets/sidebar-chat.png"
import trash from "../../../shared/assets/trash.png"
import profile from "../../../shared/assets/profile-pic.png"
import exit from "../../../shared/assets/exit.png"
import { useAuth } from '../../../shared/hooks/checkPage';
import { checkPage } from '../../../shared/hooks/checkName';
import { LeftSideProps } from '../../../entities/MainChatPage/model/types';
import { useLanguageManagement } from '../../model/MainVhatPage/LeftSide/LanguageUtils';
import { useChatChange } from '../../model/MainVhatPage/LeftSide/ChatUtils';
import { useEffect, useState} from 'react';
import chatsStore from '../../../app/store/ChatsStore';
import { observer } from 'mobx-react';
import messagesStore from '../../../app/store/Messagesstore';



export const LeftSide : React.FC<LeftSideProps>= ({toggleSidebar, leftBlockRef}) => {


    const { handleLogout } = useAuth();
    const {userName} = checkPage()
//с языками функци
const {currentLanguage, isLanguageOpen,openPannel, changeLanguage} = useLanguageManagement();
//удаление чата      
const { openChat, openInput, formAction} = useChatChange();



const LanguageSwitcherBlock = () =>{
  return(
    <>
    { isLanguageOpen && (
    <div className={styles.languageSwitcher}>
    <div 
                className={currentLanguage === 'RU' ? styles.active : ''}
                onClick={() => changeLanguage('RU')}
              >
                RU
              </div>
              <div 
                className={currentLanguage === 'EN' ? styles.active : ''}
                onClick={() => changeLanguage('EN')}
              >
                EN
              </div>
    </div>)
    }
    </>
  )
}
const LogoBlock = () =>{
  return(
    <>
        <div className={styles.logoBlock}>
    <div>
      <img src = {logo}/>
    </div>
    <div className={styles.languageBlock}>
    <div className={styles.planet}><img src = {lang}/></div>
    <div className = {styles.lang}>{currentLanguage}</div>
    <div className={styles.vector} onClick={openPannel}><img src = {vector}/></div>
    </div>
    </div>

    </>
  )
}

const ButtomBlock = () =>{
  return (
    <>
        <div className={styles.buttonBlock}>
    <div onClick = {openChat} className={styles.addButton}>
          <img src = {add}/>
        </div>
        <div className={styles.searchButton}>
          <img src = {search}/>
        </div>
    </div>
    </>
  )
}

const InputBlockChat = () =>{
 
  return (
    <>
        {
      openInput &&     <form action = {formAction}  className={styles.formChat}>
      <input placeholder="Введите название" name= "chatName"/>
      <button type="submit">Создать чат</button>
    </form>
    }
    </>
  )
}

const ShowChats = observer(() => {

useEffect(()=>{
chatsStore.fetchChats();
},[])
const handleChatClick = (id:string) =>{
chatsStore.selectChat(id);
messagesStore.fetchMessage(id)
}



  return (
    <div className={styles.chatSection}>
      {chatsStore.chats.map((el) => (
        <div   key={el.id} className={styles.chatBlock}>
          <div className={styles.chatBlockRight}>
            <div><img src={chat}/></div>
            <div onClick = {()=>handleChatClick(el.id)} className={chatsStore.selectedChatId === el.id ? `${styles.chatName} ${styles.activeChat}` : styles.chatName}>{el.name}</div>
          </div>
          <div className={styles.deleteBtn}> 
            <img 
              src={trash} 
              onClick={() => chatsStore.deleteChat(el.id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
})

const Profile = () =>{
  return<>
      <div className={styles.profileBlock}>
    <div className={styles.profileelement}>       
    <div><img src = {profile}/></div>
    <div>
      <div>{userName}</div>
      <div>9 012 TKN</div>
    </div>
    </div>
    <div onClick = {handleLogout} className={styles.exitBtn}><img src = {exit}/></div>
    </div>
  </>
}



    return (
        <>
        <div 
         onClick={toggleSidebar}
         className={styles.mobileLeftBlock}>
        ☰
        </div>
        <div ref={leftBlockRef}  className={styles.leftBlock} >
{/* блок с языком */}
<LanguageSwitcherBlock/>
    <div>  
      {/* блок с языком */}      
<LogoBlock/>

    {/* блок с кнопками */}
<ButtomBlock/>

{/* Блок с input для создания чата */}
<InputBlockChat/>

    {/* блок с отображением чатов */}
<ShowChats/>
    </div>

    {/* Блок профиля */}
<Profile/>

</div>

        </>
    )
}

