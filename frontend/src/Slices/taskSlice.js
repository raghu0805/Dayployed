import {createSlice} from '@reduxjs/toolkit'


const initialState={
    tasks:[]
}


export const TaskSlice=createSlice({
    name:"tasks",
    initialState,
    reducers:{
        getUser:(state,action)=>{
            state.tasks=[...state.tasks,action.payload]
        }
    }
})

export const {getUser}=TaskSlice.actions;

export default TaskSlice.reducer;