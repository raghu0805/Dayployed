import React, { useState } from 'react'

const Delete = () => {
  const [arr, setArr] = useState([]);
  const [Data, setData] = useState({
    Task_id: arr.length + 1,
    task_name: "",
    task_description: "",
    Priority: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
      const newTask = {
    ...Data,
    Task_id: arr.length + 1
  };
    setArr((a)=>[...a,newTask])
    setData({
    Task_id: arr.length + 1,
    task_name: "",
    task_description: "",
    Priority: ""
  })
  console.log(Data,arr);
  };

  return (
    <div className='w-screen h-screen  flex justify-center items-start pt-8 '>
      <form onSubmit={handleSubmit} className='w-[35%] flex flex-col justify-center items-center 
      gap-4 py-8 px-4 border rounded-lg bg-white text-black'>
        <label className='text-center text-xl font-semibold'>Create a Task</label>
        <div>
          <label className='text-base'>Task Id</label>
        <br />
          <input type="text" name="Task_id" placeholder="id" value={arr.length + 1}
            className='border h-12 w-96 p-2 bg-white-900' readOnly />
        </div>

        <div>
          <label className='text-base'>Name of the Task</label>
          <br />
          <input
            onChange={(e) => { setData((d) => ({ ...d, [e.target.name]: e.target.value })) }}
            type="text" name="task_name" value={Data.task_name} placeholder='Name of the task' required
            className='border h-12 w-96 p-2 bg-white-900' />
        </div>
        <div>
          <label className='text-base'>Description</label>
          <br />
          <textarea rows="3" 
            onChange={(e) => { setData((d) => ({ ...d, [e.target.name]: e.target.value })) }}
            name="task_description" value={Data.task_description} placeholder='About the task' required
            className='border w-96  p-2  resize-none' />
        </div>

   

        <div>
          <label className='text-center text-base'>Priority level</label>
          <br />
          <select name="Priority" id=""
            className='border h-12 w-96 p-2 bg-white-900' onChange={(e) => { setData((d) => ({ ...d, [e.target.name]: e.target.value })) }}
          >
            <option value="Low" >Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button
  type="submit"
  className="border bg-black text-white px-4 py-3 rounded-xl"
>
  Create Task
</button>
      </form>
    </div>
  )
}

export default Delete;