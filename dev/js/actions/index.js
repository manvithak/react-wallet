import {LoginUser} from './types';
import axios from 'axios';

export const loginUser=(data) =>{
  console.log(data);
  return function(dispatch){
    axios.post('http://localhost:8080/login',{
      phone:data.phone,
      password:data.password
    }).then(response =>{
      if(response.data.token){
        dispatch({
          type : LoginUser,
          activeUser :{
            user:data,
            token:response.data.token,
            amount:response.data.balance
          }
        })
      }else{
        dispatch({
          type:LoginUser,
          activeUser:null
        })
      }
    }).catch(err =>{
      console.log(err);
    })
  }
}
