import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import language from "../../store/language";

const LanguageHelper = ({ selectedLang }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const langList = ['zh-TW'];
    const defaultLang = ['en', ''];
    let currentLang = selectedLang || window.location.pathname.split('/')[1];
    currentLang = langList.includes(currentLang) ? currentLang : 'en';

    let currentPath = defaultLang.includes(currentLang) ? '' : `/${currentLang}`;
    dispatch(language.actions.setLang({
      lang: currentLang,
      path: currentPath,
    }));
  }, [selectedLang])

  return (<></>)
}

export default LanguageHelper;