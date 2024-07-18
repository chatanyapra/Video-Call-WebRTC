import {Route, Routes} from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from "./callingcomponents/Home";
import CallingRoom from "./callingcomponents/CallingRoom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
          <Route path='/' element={<h1>Hello don!</h1>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/room/:roomId' element={<CallingRoom/>} />
      </Routes>
    </div>
  )
}

export default App
