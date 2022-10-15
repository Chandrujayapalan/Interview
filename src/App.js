import React from "react"
import Register from "./Register";
import Login from "./Login";
import Flight from "./Flight";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
function App() {

  return (
    <Router>
      <Link to='/Register' >Register</Link>

      <Link to='/Login' >Login</Link>
      <Routes>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Flight' element={<Flight/>}></Route>

      </Routes>
    </Router>
  )


}
export default App;