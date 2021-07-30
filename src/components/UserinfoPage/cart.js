import React,{useState,useEffect} from 'react';
import { getCart } from '../../controller/userinfo';
import {Button} from 'react-bootstrap';
import { deleteCart } from '../../controller/userinfo';


function EachCart(props){

    const clickEvent=()=>{
        props.onClick(props.idx)
    }
    return (
    <div>    
    {props.cart._id}
    <Button onClick={clickEvent}> 삭제</Button>       
    </div>)

}
export default function Cart(){
    const [cart, setcart] = useState([])
    const [change, setchange] = useState(false)


    useEffect(() => {
       

        getCart().then((data)=>{  
        setcart(data)
        })
 
    }

    ,[change])
    const removeCart=(idx)=>{
        cart.splice(idx,1)
        deleteCart(cart[idx]._id).then((res)=>{
            setchange(!change)
        })
    }
    const rendering=()=>{
        const result = [];
        for (let i = 0; i < cart.length; i++) {
          result.push(<EachCart key={i} cart={cart[i]} onClick={removeCart} idx={i}></EachCart>);
        }
        return result;
      }
    return(
        <div>{rendering()}</div>

        )
}