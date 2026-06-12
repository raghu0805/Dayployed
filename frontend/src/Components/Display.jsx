import React, { useEffect, useState } from 'react'
import { GrFlag } from "react-icons/gr";
import { MdPriorityHigh } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom"
import axios from 'axios';
const Display = () => {

  const [data, setData] = useState(null);

  const handleDelete = async (id) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!isConfirmed) return;

  try {
    const res = await axios.delete("http://localhost:5000/delete", {
      data: {
        task_id: id,
      },
    });

    console.log(res.data);

    // Remove deleted task from UI
    setData((prev) => prev.filter((task) => task.id !== id));
  } catch (err) {
    console.error(err);
  }
};

  useEffect(()=>{
    
    const getData=async()=>{
      const res=await axios.get("http://localhost:5000/");
      console.log(res);
      setData(res.data);
    }
    getData();
  },[])
  
  return (
    <>

      {data?.map((d, idx) => (

        <div key={idx} className='border px-7 py-4 flex flex-col gap-y-3 bg-white rounded-lg'>
          <div className='flex justify-between items-start border p-3 bg-white'>
  
  <div className='flex gap-6 flex-1'>
    
    <div className='w-[55px] h-[55px] rounded-full bg-blue-300 flex justify-center items-center flex-shrink-0'>
      <GrFlag className='text-red-700' />
    </div>

    <div className='text-black flex-1'>
      <h1 className='font-semibold'>{d.title}</h1>
      <p className='break-words'>
        {d.description}
      </p>
    </div>

  </div>

  <div className='flex gap-3 flex-wrap ml-4'>
    <div className='w-28 h-10 bg-yellow-600 rounded-full flex items-center justify-center gap-2'>
      <MdPriorityHigh />
      <span>{d.priority}</span>
    </div>

    <div className='w-28 h-10 bg-yellow-600 rounded-full flex items-center justify-center gap-2'>
      <GrFlag />
      <span>{d.status}</span>
    </div>
  </div>

</div>

          <div className='px-5 flex items-center gap-2  ml-2'>
            <CiCalendar className='text-black ' />
            <h1 className='text-black'>Created at: {d.created_at.split("T")[0]}</h1>
          </div>
          <div className='px-5 flex items-center gap-2  '>

          <Link to={`/update/${d.id}`} className='w-28 h-10 bg-gray-600 rounded-lg flex items-center justify-center gap-2 ml-5'>
            <FaPencilAlt />
            <span>Edit</span>
          </Link>
       <button
  onClick={() => handleDelete(d.id)}
  className='w-28 h-10 bg-red-600 rounded-lg flex items-center justify-center gap-2 ml-5'
>
  <FaPencilAlt />
  <span>Delete</span>
</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default Display