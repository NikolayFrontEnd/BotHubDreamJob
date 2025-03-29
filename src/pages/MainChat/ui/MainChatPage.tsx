import styles from './MainChatPage.module.css';
import { LeftSide, RightSide } from "../../../widgets";
import { useToggleSidebar } from '../../../shared/hooks/useToggleSidebar';
export const MainChatPage = () =>{

  //хук для управление панелью при мобильной версии
  const { 
    leftBlockRef, 
    rightBlockRef, 
    toggleSidebar 
  } = useToggleSidebar();
      return (
        <>
        <div className={styles.container}>
<LeftSide toggleSidebar = {toggleSidebar} leftBlockRef = {leftBlockRef}/>
<RightSide rightBlockRef = {rightBlockRef}/>
        </div>
        </>
      )
    }
