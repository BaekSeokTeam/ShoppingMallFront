import React,{useState,useEffect} from 'react';
import {Button,Modal,closeButton, CloseButton,Form} from 'react-bootstrap'
import DaumAddress from "./DaumAdress";
import { getUserInfo } from '../../controller/user';


const EachAddress=(props)=>{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [road, setroad] = useState(props.address.roadAddr)
  const [detailed, setdetailed] = useState(props.address.detailedAddr)
  const detailedAddrHandler=(event)=>{
    setdetailed(event.currentTarget.value)
  }

  const changeRoad=async (data)=>{
    
    await setroad(data)
    
  }
  return(
    <>
    <Form.Group>
      <Form.Label>주소</Form.Label>
        <Form.Control type="text" placeholder={road} readOnly/>
        <Form.Control type="text" value ={detailed} placeholder={detailed} onChange={detailedAddrHandler}/>
    </Form.Group>
      <Button variant="primary" onClick={handleShow}>
        주소지 변경
      </Button>
      <Modal show={show} onHide={handleClose}>
        <CloseButton onClick={handleClose}></CloseButton>
        <Modal.Body>
            <DaumAddress onRevise={changeRoad}></DaumAddress>
        </Modal.Body>
      </Modal>
    </>
);
}
export default function Address(){
 
   const [address, setaddress] = useState([])

  useEffect(() => {
    getUserInfo().then((body)=>{

      if (body){
        setaddress(body.address);
      }
      else{
          //props.history.push('/')
      }
})
  }, [])
  const rendering=()=>{
    const result = [];
    for (let i = 0; i < address.length; i++) {
      result.push(<EachAddress key={i} address={address[i]}></EachAddress>);
    }
    return result;
  }

  return( 
  <Form>
    {rendering()} 
    <br></br> 
    <br></br>   
  <Button variant="primary" type="submit">
    저장
  </Button>
  </Form>);
  
}