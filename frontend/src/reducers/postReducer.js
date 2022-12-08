export const getallPostReducer = (state={posts:[]},action)=>{
    switch(action.type){
        case 'GET_ALL_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_ALL_POST_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'GET_ALL_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}

export const AddallPostReducer = (state={posts:[]},action)=>{
    switch(action.type){
        case 'ADD_ALL_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'ADD_ALL_POST_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'ADD_ALL_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}

export const getRecentAllPostsReducer = (state={recentposts:[]},action)=>{
    switch(action.type){
        case 'GET_RECENTPOST_ALL_REQ':
            return {
                ...state,
                loadingrecent:true
            }
        case 'GET_RECENTPOST_ALL_SUCCESS':
            return {
                recentposts:action.payload,
                loadingrecent:false
            }
        case 'GET_RECENTPOST_ALL_FAIL':
            return {
                errorrecent:action.payload,
                loadingrecent:false
            }   
        default: return state     
    }
}