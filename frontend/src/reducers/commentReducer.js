export const addUnivCommentReducer = (state={},action)=>{
    switch(action.type){
        case 'ADD_UNIV_COMMENT_REQ':
            return {
                ...state,
                loading:true
            }
        case 'ADD_UNIV_COMMENT_SUCCESS':
            return {
                success:true,
                loading:false
            }
        case 'ADD_UNIV_COMMENT_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}

export const addAllPostCommentReducer = (state={},action)=>{
    switch(action.type){
        case 'ADD_COMMENT_REQ':
            return {
                ...state,
                loading:true
            }
        case 'ADD_UNIV_COMMENT_SUCCESS':
            return {
                success:true,
                loading:false
            }
        case 'ADD_UNIV_COMMENT_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}