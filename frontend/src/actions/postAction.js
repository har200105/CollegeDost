import axios from 'axios';
import {API} from '../Components/Part/API';

export const getAllPosts = () => async(dispatch)=>{
    dispatch({type:'GET_ALL_POST_REQ'});
    try{
        const response = await axios.get(`${API}/globalposts`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        });
        console.log(response.data.posts);
        dispatch({type:'GET_ALL_POST_SUCCESS',payload:response.data.posts})
    }catch(e){
        dispatch({type:'GET_ALL_POST_FAIL',payload:e})
    }
}


export const addAllPost = () => async(dispatch)=>{
    dispatch({type:'ADD_ALL_POST_REQ'});
    try{
        const response = await axios.post(`${API}/createglobalpost`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        });
        console.log(response.data.posts);
        dispatch({type:'ADD_ALL_POST_SUCCESS',payload:response.data.posts});
    }catch(e){
        dispatch({type:'ADD_ALL_POST_FAIL',payload:e});
    }
}


export const getRecentAllPosts = () => async(dispatch) =>{
    dispatch({type:'GET_RECENTPOST_ALL_REQ'});
    try{
        const response = await axios.get(`${API}/getRecentPosts`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        });
        console.log(response.data);
        dispatch({type:'GET_RECENTPOST_ALL_SUCCESS',payload:response.data});
    }catch(e){
        dispatch({type:'GET_RECENTPOST_ALL_FAIL',payload:e});
    }
}


export const getUserposts =  () => async(dispatch) => {
    dispatch({type:'GET_USER_ALL_POST_REQ'});
    try {
        const pi = await axios.get(`${API}/getUserPost`, {
            headers: {
                Authorization: localStorage.getItem("jwt"),
            },
        });
          dispatch({type:'GET_USER_ALL_POST_SUCCESS',payload:pi.data})
    } catch (e) {
          dispatch({type:'GET_USER_ALL_POST_FAIL'})
    }
}

export const getThisUserAllposts = (id) => async (dispatch) => {
    dispatch({type:'GET_THIS_USER_ALL_POST_REQ'});
    try {
        const pi = await axios.get(`${API}/getUserPostById/${id}`,{
            headers:{
                "Authorization": localStorage.getItem("jwt"),
            }
        });
        dispatch({ type: 'GET_THIS_USER_ALL_POST_SUCCESS', payload: pi.data });
    } catch (e) {
        dispatch({ type: 'GET_THIS_USER_ALL_POST_FAIL' });
    }
}

export const getThisUserUnivposts = (id) => async (dispatch) => {
    dispatch({type:'GET_THIS_USER_UNIV_POST_REQ'});
    try {
        const pi = await axios.get(`${API}/getUnivUserPostById/${id}`,{
            headers:{
                "Authorization": localStorage.getItem("jwt"),
            }
        });
        dispatch({ type: 'GET_THIS_USER_UNIV_POST_SUCCESS', payload: pi.data });
    } catch (e) {
        dispatch({ type: 'GET_THIS_USER_UNIV_POST_FAIL' });
    }
}




export const getUserUnivposts =  () => async(dispatch) => {
    dispatch({type:'GET_USER_UNIV_POST_REQ'});
    try {
         const pis = await axios.get(`${API}/getUnivUserPost`, {
            headers: {
                Authorization:localStorage.getItem("jwt"),
            },
         });
        dispatch({type:'GET_USER_UNIV_POST_SUCCESS',payload:pis.data})
    } catch (e) {
          dispatch({type:'GET_USER_UNIV_POST_FAIL'})
    }
}