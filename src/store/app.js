import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        'someCounter': 0
    },
    reducers: {
        increment: (state) => {
            state.someCounter ++;
        },
        decrement: (state) => {
            state.someCounter --;
        },
        directlySet: (state, action) => {
            state.someCounter = ~~action.payload;
        }
    }
});

export default appSlice;
