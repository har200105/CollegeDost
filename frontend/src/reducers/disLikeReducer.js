export const dislikePostCollegePost = (state={posts:[]},action)=>{
    switch(action.type){
        case 'DISLIKE_CLG_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'DISLIKE_CLG_POST_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'DISLIKE_CLG_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}

export const dislikePostMainPost = (state={posts:[]},action)=>{
    switch(action.type){
        case 'DISLIKE_MAIN_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'DISLIKE_MAIN_POST_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'DISLIKE_MAIN_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}