import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from './modules/user/Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route to="/" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
