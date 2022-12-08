export const getUser = (state={user:{}},action)=>{
    switch(action.type){
        case 'GET_USER_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_USER_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'GET_USER_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}

export const blockUser =  (state={user:{}},action)=>{
    switch(action.type){
        case 'BLOCK_USER_REQUEST':
            return {
                ...state,
                loading:true
            }
        case 'BLOCK_USER_SUCCESS':
            return {
                    user:action.payload,
                    loading:false
            }    
    }
}


export const loadUserReducer =  (state={user:{},isAuthenticated:false},action)=>{
    switch(action.type){
        case 'LOAD_USER_REQ':
            return {
                ...state,
                loading:true
            }
        case 'LOAD_USER_SUCCESS':
            return {
                user: action.payload,
                isAuthenticated:true,
                loading:false
            }  
        case 'LOAD_USER_FAIL':
            return {
                loading: false,
                isAuthenticated:false
            }
        default: return state; 

    }
}


export const unblockUser =  (state={user:{}},action)=>{

    switch(action.type){
        case 'UNBLOCK_USER_REQUEST':
            return {
                ...state,
                loading:true
            }
        case 'UNBLOCK_USER_SUCCESS':
            return {
                    user:action.payload,
                    loading:false
            }    
        
    }
    
}

export const followUser =  (state={user:{}},action)=>{

    switch(action.type){
        case 'FOLLOW_USER_REQUEST':
            return {
                ...state,
                loading:true
            }
        case 'FOLLOW_USER_SUCCESS':
            return {
                    user:action.payload,
                    loading:false
            }    
        
    }
    
}

export const unfollowUser =  (state={user:{}},action)=>{

    switch(action.type){
        case 'UNFOLLOW_USER_REQUEST':
            return {
                ...state,
                loading:true
            }
        case 'UNFOLLOW_USER_SUCCESS':
            return {
                    user:action.payload,
                    loading:false
            }    
        
    }
    
}