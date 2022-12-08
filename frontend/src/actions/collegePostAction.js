import axios from 'axios';
import {API} from '../Components/Part/API';

export const getCollegePosts = () => async(dispatch)=>{
    dispatch({type:'GET_CLG_POST_REQ'});
    try{
        const response = await axios.get(`${API}/universityPosts`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        });
        console.log(response.data);
        dispatch({type:'GET_CLG_POST_SUCCESS',payload:response.data.post})
    }catch(e){
        dispatch({type:'GET_CLG_POST_FAIL',payload:e})
    }
}


export const addCollegePosts = () => async(dispatch) =>{
    dispatch({type:'ADD_CLG_POST_REQ'});
    try{
        const response = await axios.post(`${API}/addUnivpost`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        });
        console.log(response.data);
        dispatch({type:'ADD_CLG_POST_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'ADD_CLG_POST_FAIL'})
    }
}

export const getRecentCollegePosts = () => async(dispatch) =>{
    dispatch({type:'GET_RECENTPOST_CLG_REQ'});
    try{
        const response = await axios.get(`${API}/getRecentUnivPosts`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        });
        console.log(response.data);
        dispatch({type:'GET_RECENTPOST_CLG_SUCCESS',payload:response.data});
    }catch(e){
        dispatch({type:'GET_RECENTPOST_CLG_FAIL',payload:e});
    }
}

export const getUserUnivPosts = () => async(dispatch) =>{
    
}