import React, { useEffect, useState } from 'react'
import Create from './Components/Create'
import Display from './Components/Display'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState(null);

  useEffect(()=>{
    
    const getData=async()=>{
      const res=await axios.get("http://localhost:5000/");
      console.log(res);
      setData(res.data);
    }
    getData();
  },[])
  return (
    <div className='w-screen h-screen flex flex-col gap-3 text-base border px-4 py-5'>

      <h1 className='text-white text-2xl text-center'>DayPloyed Web</h1>
      <h1 className='text-white'>Total Tasks:{data?.length}</h1>
      <Link
        to="/create"
        className='self-start text-black border rounded-xl px-4 py-2 bg-white'
      >
        Create Task
      </Link>

      <Display/>
    </div>
  )
}

export default Dashboard;