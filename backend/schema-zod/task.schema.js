import {z} from "zod";


export const createTaskSchema=z.object(
    {
        title:z.string().trim().min(1,"The Title should have atleast 1 character!").optional(),
        description:z.string().trim().min(1,"The desciption should have atleast 1 character!").optional()
    }
);
export const updateTaskSchema=createTaskSchema.partial();