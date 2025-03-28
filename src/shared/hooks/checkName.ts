
import { useEffect, useState } from "react";

export const checkPage = () =>{



  const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
      const name = localStorage.getItem("userName");
      setUserName(name);
    }, []);
    
    return {
      userName,
    };
}