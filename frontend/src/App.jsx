import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Dashboard from './Dashboard'
import Create from './Components/Create'
import Update from './Components/Update'
import Delete from './Components/Delete'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/create" element={<Create/>}></Route>
      <Route path="/update/:id" element={<Update/>}></Route>
      <Route path="/delete/:id" element={<Delete/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App