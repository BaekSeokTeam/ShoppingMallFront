import React,{useState,useEffect} from 'react';
import { getUserInfo } from '../../controller/user';
import {Button} from 'react-bootstrap';
import {changeUserInfo,checkNickname} from '../../controller/userinfo';
import {withRouter} from 'react-router-dom';
function Userinfo(props) {

    const [email, setemail] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [nickname, setnickname] = useState("");
    const [flag, setflag] = useState(true);
    useEffect(()=>{
        getUserInfo().then((body)=>{

            if (body){
                setemail(body.email);
                setphonenumber(body.phonenumber);
                setnickname(body.nickname);
            }
            else{
                //props.history.push('/')
            }
    })
},[])
const onNicknameHandler=(event)=>
{
    setnickname(event.currentTarget.value)
    setflag(false)
    
}

const onNicknameClickHandler=(event)=>{

    checkNickname(nickname).then((result)=>{
        if (result.success){
            alert('사용 가능한 닉네임 입니다.')
            setflag(true)
        }
        else{
            alert('중복된 닉네임 입니다.')
        }
    })
}


 const onSubmitEvent=(event)=>{
  if(flag)
    {
        event.preventDefault();
        changeUserInfo(nickname).then((res)=>{
           
            props.history.push('/');
            
        }).catch((err)=>{   
            alert(err)
        })
        
    }
    else{
        alert('닉네임 중복확인을 해주세요')
    }
}
       

    return (
        <h1>유저 정보
        <div style={{
            display:'flex',justifyContent:'center',alignItems:'center',
            width:'100%',height:'100vh'
        }}>
        
           <form style={{display:'flex',flexDirection:'column'}}  onSubmit={onSubmitEvent}>
               <label>이메일</label>
               <input type="text" value={email} placeholder={email} disabled></input>
               <label>전화번호</label>
               <input type="text" value={phonenumber} placeholder={phonenumber} disabled></input>
               <label>닉네임</label>
               <input type="text" value={nickname} placeholder={nickname} onChange={onNicknameHandler}></input>
               <Button onClick={onNicknameClickHandler}>
                   중복확인
               </Button>
               <br/>
               <Button type='submit'>
                   저장
               </Button>
           </form> 
           
        </div>
        </h1>

     
    )
}
export default withRouter(Userinfo)