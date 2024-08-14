import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Landing from './modules/user/Pages/Landing'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </Router>
  )
}

export default App
