import style from "./AuthPage.module.css"
import close from '../../../shared/assets/close.png'
import { useActionState } from "react";

export const AuthPAge = ( { changePage }: { changePage: () => void }) => {
  
        const action = (_:any, formData:FormData)=>{
            const userName = formData.get("userName") as string;
            localStorage.setItem("userName", userName);
            changePage();
            return userName;
          }


        const [_, formAction] = useActionState(action, "");
          return(
            <>
            <div className={style.container}> 
              <div  className = {style.formBlock}> 
                <div className={style.topBlock}>
                  <div className={style.authWord}>Авторизация</div>
        <img src = {close}/>
                  </div>        
            <form  className = {style.form} action={formAction}>
              <label className={style.label}>Имя ваше</label>
               <input name = "userName" placeholder='Ваше имя'/>
               <label className={style.label}>Пароль</label>
              <input name = "password" placeholder='Ваш пароль'/>
              <button type='submit'  className={style.button}>Войти</button> 
            </form>
            </div> 
            </div>
            </>
    )
}

