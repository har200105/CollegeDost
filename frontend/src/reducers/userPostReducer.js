
export const getUserAllPostsReducer = (state = { posts: []},action) => {
    switch (action.type) {
        case 'GET_USER_ALL_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_USER_ALL_POST_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'GET_USER_ALL_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }
            default: return state    
    }
}


export const getUserUnivPostsReducer = (state = { univposts: []},action) => {
    switch (action.type) {
        case 'GET_USER_UNIV_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_USER_UNIV_POST_SUCCESS':
            return {
                univposts:action.payload,
                loading:false
            }
        case 'GET_USER_UNIV_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }
            default: return state    
    }
}

export const getThisUserAllPostsReducer = (state = { posts: []},action) => {
    switch (action.type) {
        case 'GET_THIS_USER_ALL_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_THIS_USER_ALL_POST_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'GET_THIS_USER_ALL_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }
            default: return state    
    }
}


export const getThisUserUnivPostsReducer = (state = { univposts: []},action) => {
    switch (action.type) {
        case 'GET_THIS_USER_UNIV_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_THIS_USER_UNIV_POST_SUCCESS':
            return {
                univposts:action.payload,
                loading:false
            }
        case 'GET_THIS_USER_UNIV_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }
            default: return state    
    }
}

