import {Route, Routes} from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from "./callingcomponents/Home";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
          <Route path='/' element={<h1>Hello don!</h1>} />
          <Route path='/home' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
