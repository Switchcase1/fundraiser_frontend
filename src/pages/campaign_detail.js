import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,useParams,Link   } from "react-router-dom"
import { Button as Btn,Modal as Mdl} from 'react-bootstrap';  
import Layout from "../components/Layout"
import { Modal } from './Modal';
import { GlobalStyle } from '../globalStyles';
import styled from 'styled-components';
import { MdFamilyRestroom } from 'react-icons/md';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
 
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

function CampaignDetail() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [campaign, setCampaigns] = useState({})
 

    const { id } = useParams();

    const [showmodal=false, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(showmodal=>!showmodal);
    };

    useEffect(()=>{
        if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
            navigate("/");
        }else {
            getUser()
            getCampaignDetails()
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

    const getCampaignDetails = () => {
        axios.post('/api/campaigns/get_data',{id:id}, {headers:{Authorization: localStorage.getItem('token')}})
        .then((r) => {
           console.log(r);
           setCampaigns(r.data)
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
                    
                </div>
            </div>
            <div>
            
                <div className=" campaign_detail">
                        <div className="innner">
                                <Container>
                                    <Btn onClick={openModal}>Donate</Btn>
                                    <Modal showmodal={showmodal} setShowModal={setShowModal} />
                                    <GlobalStyle />
                                </Container>
                                <Link to='/dashboard'>Go Back</Link>

                                
                                <h2><strong>About Campaign:</strong></h2>
                                <h4 className="title">{campaign.title}</h4>
                                <div className="raised-amnt">
                                        <span className="raised">
                                            <span className="currency-symbol">₹</span>{campaign.fundsCollected} </span> raised out of <br/>{campaign.required_funds}<div>
                                        </div>
                                </div>
                                <div className='thumbnail'>
                                    <img src={campaign.image} alt=''/> 
                                </div>
                                
                        
                                <div className='metadata'>
                                   
                                  
                                   
                                    <p className='desc'>
                                            {
                                               
                                                campaign.description
                                            }
                                    </p>
                                   
                                    
                                </div>
                        </div>
                </div>
           
            </div>
        </Layout>
        
    );
}
   
export default CampaignDetail;