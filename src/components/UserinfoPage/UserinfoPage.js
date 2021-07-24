import React,{useState,useEffect} from 'react'
import { getUserInfo } from '../../controller/user';

export default function UserinfoPage(props) {
    const [Email, setEmail] = useState("");
    const [Phonenumber, setPhonenumber] = useState("");
    const [Nickname, setNickname] = useState("");
    useEffect(()=>{
        getUserInfo().then((body)=>{
            setEmail(body.email);
            setPhonenumber(body.phonenumber);
            setNickname(body.nickname);
        })
},[])
       

    return (
        <div>
            <h2>{Email}</h2>
            <h2>{Phonenumber}</h2>
            <h2>{Nickname}</h2>
        </div>
    )
}
