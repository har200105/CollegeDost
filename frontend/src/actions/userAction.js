import axios from "axios";
import { API } from '../Components/Part/API';


export const loadUser = () => async(dispatch)=>{
    dispatch({type:'LOAD_USER_REQ'});
    try{
        const response = await axios.get(`${API}/loadUser`,{
            headers:{
                Authorization: localStorage.getItem("jwt"),
            }
        });
        console.log(response.data);
        dispatch({type:'LOAD_USER_SUCCESS',payload:response.data.user})
    }catch(e){
        dispatch({type:'LOAD_USER_FAIL',payload:e})
    }
}



