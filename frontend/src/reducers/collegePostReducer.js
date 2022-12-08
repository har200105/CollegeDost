export const getCollegePostReducer = (state = { collegeposts: [] }, action) => {
    switch (action.type) {
        case 'GET_CLG_POST_REQ':
            return {
                ...state,
                loading: true
            }
        case 'GET_CLG_POST_SUCCESS':
            return {
                collegeposts: action.payload,
                loading: false
            }
        case 'GET_CLG_POST_FAIL':
            return {
                error: action.payload,
                loading: false
            }
        default: return state
    }
}

export const addCollegePostReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_CLG_POST_REQ':
            return {
                ...state,
                loading: true
            }
        case 'ADD_CLG_POST_SUCCESS':
            return {
                posts: action.payload,
                loading: false
            }
        case 'ADD_CLG_POST_FAIL':
            return {
                error: action.payload,
                loading: false
            }
        default: return state
    }
}


export const getRecentCollegePostsReducer = (state = { recentcollegeposts: []},action) => {
    switch (action.type) {
        case 'GET_RECENTPOST_CLG_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_RECENTPOST_CLG_SUCCESS':
            return {
                recentcollegeposts:action.payload,
                loading:false
            }
        case 'GET_RECENTPOST_CLG_FAIL':
            return {
                error:action.payload,
                loading:false
            }
            default: return state    
    }
}