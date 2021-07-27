import axios from 'axios';
import { useParams } from 'react-router-dom';
import {header} from '../components/Config'
export const changeUserInfo = (nickname) => {
      
   
    return new Promise((resolve, reject) => {
        const data={
            nickname:nickname
        }
       
            axios.post('/api/userinfo/revise',data,header)
           
        
        .then((res) => {
            console.log(res)
  
          resolve(res.data.body);
        })
        .catch((err) => {
            console.log(2)
          reject(err);
        });
    });
  };

  export const checkNickname = (nickname) => {
      
   
    return new Promise((resolve, reject) => {
        const param={
            nickname:nickname
        }
       
            axios.get('/api/users/nicknamecheck',{params:param,headers:header})
           
        
        .then((res) => {
 
  
          resolve(res.data);
        })
        .catch((err) => {
           
          reject(err);
        });
    });
  };