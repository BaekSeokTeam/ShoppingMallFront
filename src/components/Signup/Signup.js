import React,{useState} from 'react'
import {signup} from '../../controller/user'
import { withRouter} from 'react-router-dom';
import {Button} from "react-bootstrap";
function Signup(props) {


    const [Email, setEmail] = useState("")
    const [Nickname, setNickname] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [Password, setPassword] = useState("")
    const [PasswordCheck, setPasswordCheck] = useState("")


    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onPhoneNumberHandler=(event)=>{
        setPhoneNumber(event.currentTarget.value)
    }
    const onNicknameHandler=(event)=>{
        setNickname(event.currentTarget.value)
    }
    const onPasswordCheckHandler=(event)=>{
        setPasswordCheck(event.currentTarget.value)
    }
 
    const onSubmitEvent=(event)=>
    {
        var body={
            Email,Nickname,Password,PasswordCheck,PhoneNumber

        }
        event.preventDefault();
        signup(body).then((data)=>{
            console.log(data)
            if (data.singup){
                props.history.push('/signin');
            }
            else{
                alert(data.error)
            }
            
        }).catch((err)=>{
            alert(err)
        })

        
    }
    return (
        <div style={{
            display:'flex',justifyContent:'center',alignItems:'center',
            width:'100%',height:'100vh'
        }}>
           <form style={{display:'flex',flexDirection:'column'}}
            onSubmit={onSubmitEvent}>
               <label>Email</label>
               <input type="email" value={Email} onChange={onEmailHandler}></input>
               <label>Nickname</label>
               <input type="text" value={Nickname} onChange={onNicknameHandler}></input>
               <label>PhoneNumber</label>
               <input type="text" value={PhoneNumber} onChange={onPhoneNumberHandler}></input>
               <label>Password</label>
               <input type="password" value={Password} onChange={onPasswordHandler}></input>
               <label>PasswordCheck</label>
               <input type="password" value={PasswordCheck} onChange={onPasswordCheckHandler}></input>
               <br/>
               <Button>
                   회원가입
               </Button>
           </form>
        </div>
    )
}

export default withRouter(Signup)