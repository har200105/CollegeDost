import axios from 'axios';
import {API} from '../Components/Part/API';

export const addMainComment = (comment,postId) => async(dispatch)=>{
    dispatch({type:'ADD_COMMENT_REQ'});
    try{
        const response = await axios.post(`${API}/maincomment`,{text:comment,postId:postId},{
            headers: {
                Authorization: localStorage.getItem("jwt"),
              }
        });
        console.log(response.data);
        dispatch({type:'ADD_COMMENT_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'ADD_COMMENT_FAIL',payload:e})
    }
}


export const addUnivComment = (comment,postId) => async(dispatch) =>{
    dispatch({type:'ADD_UNIV_COMMENT_REQ'});
    try{
        const response = await axios.post(`${API}/univcomment`,{text:comment,postId:postId},{
            headers: {
                Authorization: localStorage.getItem("jwt"),
              }
        });
        console.log(response.data);
        dispatch({type:'ADD_UNIV_COMMENT_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'ADD_UNIV_COMMENT_FAIL',payload:e})
    }
}