import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "../Slices/taskSlice";

const store=configureStore({
    reducer:{
        tasks:TaskReducer
    }
})

export default store;