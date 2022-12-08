export const likeAllPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "LIKE_ALL_POST_SUCCESS":
      return {
        posts: action.payload,
        loading: false,
      };
    case "LIKE_ALL_POST_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const likeUnivPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "LIKE_UNIV_POST_SUCCESS":
      return {
        posts: action.payload,
        loading: false,
      };
    case "LIKE_UNIV_POST_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const dislikeAllPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "DISLIKE_ALL_POST_SUCCESS":
      return {
        posts: action.payload,
        loading: false,
      };
    case "DISLIKE_ALL_POST_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const dislikeUnivPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_POST_REQ":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_POST_SUCCESS":
      return {
        posts: action.payload,
        loading: false,
      };
    case "GET_ALL_POST_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
