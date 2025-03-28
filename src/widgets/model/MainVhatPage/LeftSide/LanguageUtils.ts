import { useState } from 'react';

export const useLanguageManagement = () => {
  const [isLanguageOpen, setlanguageOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<'RU' | 'EN'>('RU');
    const openPannel = () =>{
      setlanguageOpen(!isLanguageOpen);
    }
    const changeLanguage = (lang: 'RU' | 'EN') => {
      setCurrentLanguage(lang);
      setlanguageOpen(false); 
    };
    return {currentLanguage, isLanguageOpen,openPannel, changeLanguage};
};