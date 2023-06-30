import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import CampaignDetail from './pages/campaign_detail'
import Thankyou from './pages/Thankyou'
 
  
function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<Login/>} />
        
          <Route path="/register"  element={<Register/>} />
          <Route path="/dashboard"  element={<Dashboard/>} />
          <Route path="/dashboard/:id" element={<CampaignDetail/>} />
          <Route path="/thankyou"  element={<Thankyou/>} />

      </Routes>
    </Router>
  );
}
  
export default App;