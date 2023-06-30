import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
  

function Thankyou() {    
    const navigate = useNavigate();
    return (
        
        
            <div className="thankyou">
                
                    <p className="text-center">Thank you for donation :)</p>
                  
                    <Link to='/dashboard'>Go To Dashboard</Link>
                
            </div>
            
    );
}
   
export default Thankyou;