import React, { useRef, useEffect,useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios'
import { useNavigate,useParams  } from "react-router-dom"

import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
 
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showmodal, setShowModal }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
 
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showmodal ? 1 : 0,
    transform: showmodal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showmodal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showmodal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const { id } = useParams();


  const handleSubmit = (event) => {
    if(userInput === undefined || userInput === 0){
        alert("Please enter a valid input");return false;
    }
    event.preventDefault();
    axios.post('/api/campaigns/donate',{id:id,amount:userInput}, {headers:{Authorization: localStorage.getItem('token')}})
    .then((r) => {
       console.log(r);
       setData(r.data);
       navigate("/thankyou");
    })
    .catch((e) => {
        console.log(e)
    });
    
  };
  
  return (
    <>
      {showmodal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showmodal={showmodal}>
             
              <ModalContent>
                <h1>Please enter the Amount to donate</h1>
               
                    <form onSubmit={handleSubmit}>
                       
                        <input required
                        className="form_input"
                        id="search"
                        type="number"
                      
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        />
                        <button>Donate</button>
                    </form>

                
                
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};