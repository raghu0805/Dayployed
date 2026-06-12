import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Data, setData] = useState({
  id: "",
  title: "",
  description: "",
  priority: ""
});


  useEffect(()=>{
    const getData=async()=>{
      const res=await axios.get(`http://localhost:5000/task/${id}`);
      console.log(res.data[0]);
      setData(res.data[0]);
    }
    getData();
  },[])

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(Data);
    const res=await axios.put(`http://localhost:5000/update/${id}`,Data);
    console.log(res.data);


    navigate("/");

  };

  return (


    <div className='w-screen h-screen  flex justify-center items-start pt-8 '>
    
  
      <form onSubmit={handleSubmit} className='w-[35%] flex flex-col justify-center items-center 
      gap-4 py-8 px-4 border rounded-lg bg-white text-black'>
      
        <label className='text-center text-xl font-semibold'>Edit the Task</label>
        <div>
          <label className='text-base'>Task Id</label>
        <br />
          <input type="text" name="Task_id" placeholder="id" value={Data.id}
            className='border h-12 w-96 p-2 bg-white-900' readOnly />
        </div>
        <div>
          <label className='text-base'>Name of the Task</label>
          <br />
          <input
            onChange={(e) => { setData((d) => ({ ...d, "title": e.target.value })) }}
            type="text" name="task_name" value={Data.title} placeholder='Name of the task' required
            
            className='border h-12 w-96 p-2 bg-white-900' />
        </div>
        <div>
          <label className='text-base'>Description</label>
          <br />
          <textarea rows="3" 
            onChange={(e) => { setData((d) => ({ ...d, "description": e.target.value })) }}
            value={Data.description}
            name="task_description"  placeholder='About the task' required
            className='border w-96  p-2  resize-none'
             />
        </div>
        <div>
          <label className='text-center text-base'>Priority level</label>
          <br />
          <select name="Priority" id=""
          onChange={(e) => { setData((d) => ({ ...d, "priority": e.target.value })) }}
            className='border h-12 w-96 p-2 bg-white-900' value={Data.priority}>
            <option value="low" >Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
  type="submit"
  className="border bg-black text-white px-4 py-3 rounded-xl"
>
  Update Task
</button>

      </form>
    </div>
      
  )
}

export default Update;











