import React,{useEffect} from 'react'
import axios from 'axios'
import {header} from '../../utils/config'

export default function Auth(SpecificComponent,option=null,adminRoute=null) {
    
    
    function CheckAuth(props){
        useEffect(()=>{
            axios.get('api/users/auth',header).then((res)=>{
                if (res){
                    console.log(res.data)
                }
            })
        },[])

        return <SpecificComponent />    
    }
    return CheckAuth

}

