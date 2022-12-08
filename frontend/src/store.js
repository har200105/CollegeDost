import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { AddallPostReducer, getallPostReducer, getRecentAllPostsReducer } from './reducers/postReducer';
import { addCollegePostReducer, getCollegePostReducer, getRecentCollegePostsReducer } from './reducers/collegePostReducer';
import { addAllPostCommentReducer, addUnivCommentReducer } from './reducers/commentReducer';
import { likeAllPostReducer, likeUnivPostReducer } from './reducers/likeReducer';
import { addResourcesReducer, getRecentResourcesReducer, getResourcesReducer } from './reducers/resourceReducer';
import { getAllHashtagsReducer, getCollegeHashTagsReducer } from './reducers/hashTagReducer';
import { getThisUserAllPostsReducer, getThisUserUnivPostsReducer, getUserAllPostsReducer, getUserUnivPostsReducer } from './reducers/userPostReducer';
import { loadUserReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    getallPostReducer:getallPostReducer,
    AddallPostReducer:AddallPostReducer,   
    likeAllPostReducer:likeAllPostReducer,
    getCollegePostReducer:getCollegePostReducer,
    addUnivCommentReducer:addUnivCommentReducer,
    addAllPostCommentReducer:addAllPostCommentReducer,
    likeUnivPostReducer:likeUnivPostReducer,
    addResourcesReducer:addResourcesReducer,
    getResourcesReducer:getResourcesReducer,
    addCollegePostReducer:addCollegePostReducer,
    getRecentCollegePostsReducer:getRecentCollegePostsReducer,
    getAllHashtagsReducer:getAllHashtagsReducer,
    getCollegeHashTagsReducer:getCollegeHashTagsReducer,
    getRecentAllPostsReducer:getRecentAllPostsReducer,
    getRecentResourcesReducer: getRecentResourcesReducer,
    getUserAllPostsReducer: getUserAllPostsReducer,
    getUserUnivPostsReducer: getUserUnivPostsReducer,
    getThisUserAllPostsReducer: getThisUserAllPostsReducer,
    getThisUserUnivPostsReducer: getThisUserUnivPostsReducer,
    loadUserReducer:loadUserReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)));
export default store;