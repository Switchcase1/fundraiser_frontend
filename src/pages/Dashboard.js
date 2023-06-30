import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
  
function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [campaigns, setCampaigns] = useState({})
 
    useEffect(()=>{
        if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
            navigate("/");
        }else {
            getUser()
            getCampaigns()
        }
    },[])
 
    const getUser = () => {
        axios.get('/api/user', { headers:{Authorization: localStorage.getItem('token')}})
        .then((r) => {
           setUser(r.data)
        })
        .catch((e) => {
            console.log(e)
        });
    }
 
    const logoutAction = () => {
        axios.post('/api/logout',{}, { headers:{Authorization: localStorage.getItem('token')}})
        .then((r) => {
            localStorage.setItem('token', "")
           navigate("/");
        })
        .catch((e) => {
            console.log(e)
        });
    }

    const getCampaigns = () => {
        axios.get('/api/campaigns', { headers:{Authorization: localStorage.getItem('token')}})
        .then((r) => {
            console.log(r);
           setCampaigns(r.data.campaigns)
        })
        .catch((e) => {
            console.log(e)
        });

       
    }
     
    return (
       
        <Layout>
           <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Campaigns</a>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a onClick={()=>logoutAction()} className="nav-link " aria-current="page" href="#">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <h2 className="text-center mt-5">Welcome, {user.name}!</h2>
                    <p className="text-center">Help these people by giving some part of your income and get their blessings :)</p>
                </div>
            </div>
            <div>
            {campaigns.length > 0 && (
                <div class="d-flex fundraise_cards">
                    <ul>
                    {campaigns.map(c => (
                        <li key={c.id}>

                                <div className='thumbnail'>
                                    <img src={c.image} alt=''/> 
                                </div>
                                
                        
                                <div className='metadata'>
                                    <h4 className="title"><a href={"/dashboard/" + c.id}>{c.title}</a></h4>
                                    <div className="raised-amnt">
                                        <span className="raised">
                                            <span className="currency-symbol">₹</span>{c.fundsCollected==null?0:c.fundsCollected} </span> raised out of <br/>{c.required_funds}<div>
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: (c.fundsCollected/c.required_funds)*100+"%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    
                                    <p className='desc'>
                                            {
                                                c.description.length >100 ? 
                                                (c.description.substr(0,100)) + "..." :
                                                (c.description)
                                            }
                                    </p>
                                    
                                   
                                </div>
                        </li>
                    ))}
                    </ul>
                </div>
            )}
            </div>
        </Layout>
        
    );
}
   
export default Dashboard;