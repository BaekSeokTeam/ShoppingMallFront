import React,{useState,useEffect} from 'react'
import { getUserInfo } from '../../controller/user';
import {Form,Button} from 'react-bootstrap'

export default function UserinfoPage(props) {
    const [Email, setEmail] = useState("");
    const [Phonenumber, setPhonenumber] = useState("");
    const [Nickname, setNickname] = useState("");
    useEffect(()=>{
        getUserInfo().then((body)=>{

            if (body){
                setEmail(body.email);
                setPhonenumber(body.phonenumber);
                setNickname(body.nickname);
            }
            else{
                //props.history.push('/')
            }
    })
})
       

    return (
        
        <div style={{
            display:'flex',justifyContent:'center',alignItems:'center',
            width:'100%',height:'100vh'
        }}>
        <h1>유저 정보</h1>
           <form style={{display:'flex',flexDirection:'column'}}>
               <label>이메일</label>
               <input type="text" value={Email} placeholder={Email}></input>
               <label>전화번호</label>
               <input type="text" value={Phonenumber} placeholder={Phonenumber}></input>
               <label>닉네임</label>
               <input type="text" value={Nickname} placeholder={Nickname}></input>
               <br/>
               <Button type='submit'>
                   저장
               </Button>
           </form>
        </div>
     
    )
}
