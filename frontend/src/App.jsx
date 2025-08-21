import React from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/dashboard' exact element={<Home/>}/>
      <Route path='/Login' exact element={<Login/>}/>
      <Route path='/Signup' exact element={<Signup/>}/>
    </Routes>
  </Router>
);
const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
