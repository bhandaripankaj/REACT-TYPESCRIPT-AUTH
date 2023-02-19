import axios from '../axios';

export const signUpUser = async(data)=>{
   return axios.post('pub/signup',data)
}

export const loginUser = async(data)=>{
    return axios.post('pub/login',data)
}