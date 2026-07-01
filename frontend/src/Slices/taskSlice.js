import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    tasks: []
}


export const TaskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {

        createUser: (state, action) => {
            state.tasks.push(action.payload)
            // state.tasks=[...state.tasks,action.payload]
        },
        deleteUser: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id != action.payload)
        },
        updateUser: (state, action) => {
            state.tasks = state.tasks.map((task) => {
                //update the data
                if (task.id == action.payload.id) {
                    return action.payload
                }
                //else return the previous data
                return task;
            })

        }
    }
})

export const { deleteUser, createUser, updateUser } = TaskSlice.actions;

export default TaskSlice.reducer;