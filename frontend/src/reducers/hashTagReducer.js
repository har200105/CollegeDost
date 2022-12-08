export const getAllHashtagsReducer = (state = { hashTags: [] }, action) => {
    switch (action.type) {
        case 'GET_ALL_HASHTAG_REQ':
            return {
                ...state,
                loadingAllHashtags: true
            }
        case 'GET_ALL_HASHTAG_SUCCESS':
            return {
                hashTags: action.payload,
                loadingAllHashtags: false
            }
        case 'GET_ALL_HASHTAG_FAIL':
            return {
                errorAllHashtags: action.payload,
                loadingAllHashtags: false
            }
        default: return state
    }
}



export const getCollegeHashTagsReducer = (state = { hashTagsUniv: [] }, action) => {
    switch (action.type) {
        case 'GET_COLLEGE_HASHTAG_REQ':
            return {
                ...state,
                loadinghashtaguniv: true
            }
        case 'GET_COLLEGE_HASHTAG_SUCCESS':
            return {
                hashTagsUniv: action.payload,
                loadinghashtaguniv: false
            }
        case 'GET_COLLEGE_HASHTAG_FAIL':
            return {
                errorhashtaguniv: action.payload,
                loadinghashtaguniv: false
            }
        default: return state
    }
}
