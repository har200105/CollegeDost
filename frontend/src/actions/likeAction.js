import axios from 'axios';
import { API } from '../Components/Part/API';

export const LikeAllPost = (id) => async (dispatch) => {
    try {
        const response = await axios.post(`${API}/mainlike`, {
            postId: id
        }, {
            headers: {
                Authorization: localStorage.getItem("jwt"),
            }
        });
        console.log(response.data);
        dispatch({ type: 'LIKE_ALL_POST_SUCCESS', payload: response.data })
    } catch (e) {
        dispatch({ type: 'LIKE_ALL_POST_FAIL', payload: e })
    }
}


// export const takeBackAllPostLike = (id) => async (dispatch) => {
//     try {
//         const response = await axios.post(`${API}/`, {
//             postId: id
//         }, {
//             headers: {
//                 Authorization: localStorage.getItem("jwt"),
//             }
//         });
//         if (response.status === 201) {
//             dispatch({ type: 'TAKE_ALLPOST_SUCCESS' });
//         }
//     } catch (e) {
//         dispatch({ type: 'TAKE_ALLPOST_FAIL', payload: e })
//     }
// }



export const LikeUnivPost = (id) => async (dispatch) => {
    try {
        const response = await axios.post(`${API}/univlike`, {
            postId: id
        }, {
            headers: {
                Authorization: localStorage.getItem("jwt"),
            }
        });
        console.log(response.data);
        dispatch({ type: 'LIKE_UNIV_POST_SUCCESS', payload: response.data })
    } catch (e) {
        dispatch({ type: 'LIKE_UNIV_POST_FAIL', payload: e })
    }
}


export const takeBackUnivPostLike = (id) => async (dispatch) => {
    try {
        const response = await axios.post(`${API}/`, {
            postId: id
        }, {
            headers: {
                Authorization: localStorage.getItem("jwt"),
            }
        });
        if (response.status === 201) {
            dispatch({ type: 'TAKE_UNIVPOST_SUCCESS' });
        }
    } catch (e) {
        dispatch({ type: 'TAKE_UNIVPOST_FAIL', payload: e })
    }
}


export const disLikeAllPost = (id) => async (dispatch) => {
    try {
        const response = await axios.post(`${API}/dislikeAllPost`, {
            postId: id
        }, {
            headers: {
                Authorization: localStorage.getItem("jwt"),
            }
        });
        dispatch({ type: 'DISLIKE_ALL_POST_SUCCESS', payload: response.data })
    } catch (e) {
        dispatch({ type: 'DISLIKE_ALL_POST_FAIL', payload: e });
    }
}


export const takeBackAllPostLike = (id) => async (dispatch) => {
    try {
        const response = await axios.post(`${API}/`, {
            postId: id
        }, {
            headers: {
                Authorization:  localStorage.getItem("jwt"),
            }
        });
        if (response.status === 201) {
            dispatch({ type: 'TAKE_ALLPOST_SUCCESS' });
        }
    } catch (e) {
        dispatch({ type: 'TAKE_ALLPOST_FAIL', payload: e })
    }
}



export const disLikeUnivPost = (id) => async (dispatch) => {
    try {
        const response = await axios.post(`${API}/dislikeUnivPost`, {
            postId: id
        }, {
            headers: {
                Authorization:  localStorage.getItem("jwt"),
            }
        })
        dispatch({ type: 'DISLIKE_UNIV_POST_SUCCESS', payload: e });
    } catch (e) {
        dispatch({ type: 'DISLIKE_UNIV_POST_FAIL', payload: e });
    }
}



// export const takeBackUnivPostLike = (id) => async (dispatch) => {
//     try {
//         const response = await axios.post(`${API}/`, {
//             postId: id
//         }, {
//             headers: {
//                 Authorization:  localStorage.getItem("jwt"),
//             }
//         });
//         if (response.status === 201) {
//             dispatch({ type: 'TAKE_UNIVPOST_SUCCESS' });
//         }
//     } catch (e) {
//         dispatch({ type: 'TAKE_UNIVPOST_FAIL', payload: e })
//     }
// }
