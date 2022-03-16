import { createSlice } from "@reduxjs/toolkit";

const language = createSlice({
    name: 'language',
    initialState: {
      'lang': '',
      'path': ''
    },
    reducers: {
      setLang: (state, action) =>{
        const { lang, path } = action.payload;
        state.lang = lang;
        state.path = path;
      }
    }
});

export default language;
