import axios from 'axios';
import {API} from '../Components/Part/API';

export const getUnivResources = () => async(dispatch)=>{
    dispatch({type:'GET_UNIV_RESOURCES_REQ'});
    try{
        const response = await axios.get(`${API}/getResources`,{
            headers:{
                Authorization: localStorage.getItem("jwt"),
            }
        });
        console.log(response.data);
        dispatch({type:'GET_UNIV_RESOURCES_SUCCESS',payload:response.data.Recentresources})
    }catch(e){
        dispatch({type:'GET_UNIV_RESOURCES_FAIL',payload:e})
    }
}


export const getRecentResources = () => async(dispatch)=>{
    dispatch({type:'GET_RECENT_UNIV_RESOURCES_REQ'});
    try{
        const response = await axios.get(`${API}/getRecentResources`,{
            headers:{
                Authorization: localStorage.getItem("jwt"),
            }
        });
        console.log(response.data);
        dispatch({type:'GET_RECENT_UNIV_RESOURCES_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'GET_RECENT_UNIV_RESOURCES_FAIL',payload:e})
    }
}

export const addResources = (resource) => async(dispatch) =>{
    dispatch({type:'ADD_RESOURCES_REQUEST'});
    try{
        const response = await axios.post(`${API}/addResources`,{resource},{
            headers:{
                Authorization: localStorage.getItem("jwt"),
            }
        });
        dispatch({type:'ADD_RESOURCES_SUCCESS',payload:response.data});
    }catch(e){
        dispatch({type:'ADD_RESOURCES_FAIL',payload:e})
    }
}
