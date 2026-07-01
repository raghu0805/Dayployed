import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Dashboard from './Dashboard'
import Create from './Components/Create'
import Update from './Components/Update'
import Delete from './Components/Delete'
import { Provider } from "react-redux";
import store from "./Store/Store.js";
const App = () => {
  return (
    <>
      <Provider store={store}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/update/:id" element={<Update />}></Route>
            <Route path="/delete/:id" element={<Delete />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App