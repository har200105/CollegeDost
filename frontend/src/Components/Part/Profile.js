import React from "react";
import Header from "./Header";
import Post from "./Que";
import Answer from "./Answer";
import "./Profile.css";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext, LoginContext } from "../../ContextProvider/ContextProvider";
import axios from "axios";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import CollegeQuestion from "./CollegeQuestion";
import { API } from "./API";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserposts, getUserUnivposts } from "../../actions/postAction";


const Profile = () => {

  // const { user } = useContext(AuthContext);
   const { user,isAuthenticated } = useSelector((state) => state.loadUserReducer);
  const {posts} = useSelector((state) => state.getUserAllPostsReducer);
  const { univposts } = useSelector((state) => state.getUserUnivPostsReducer);
  
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getUserposts());
    dispatch(getUserUnivposts());
  }, [dispatch]);
  
  var HasPosted = false;
  return (
    <div className="profile">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Header />
      <div className="profile_pg">
        <div
          className="profile_sidebar"
          style={{
            height: "80vh",
          }}
        >
          <img
            className="profile_pic pp"
            src={
              user?.avatar
                ? user?.avatar
                : "https://res.cloudinary.com/harshit111/image/upload/v1627476410/q1rjnignh5djpnujltyy.png"
            }
            style={{ height: "250px", width: "250px" }}
            alt=""
          />
          <div>{user?.name}</div>
          <div>{user?.email}</div>
          <div>University :{user?.university}</div>
          <div> Posts : {posts?.length + univposts?.length}</div>
        </div>

        <div className="profile_post">
          Questions Posted
          {HasPosted ? (
            <div>No posts from this User</div>
          ) : (
            <div>
              {posts.map((p) => (
                <Post
                  description={p.body}
                  hasbeenCommented={p.hasBeenCommented}
                  photo={p.photo}
                 comments={p.comments.map((x) => (
                <div>
                  <Link to={`/user?${x?.commentedBy?._id}`} style={{
                     textDecoration:"none"
                  }}>
                  <p
                    style={{
                        fontWeight: "bold",
                        textDecoration:"none"
                    }}
                  >
                    {x.commentedBy.name}
                    </p>
                    </Link>
                  <p>{x.text}</p>
                </div>
              ))}
                  id={p._id}
                  likes={p.likes}
                  dislikes={p.dislikes}
                  postedBy={p.postedBy}
                />
              ))}

              {univposts.map((p) => (
                <CollegeQuestion
                  description={p.body}
                    comments={p.comments.map((x) => (
                <div>
                  <Link to={`/user?${x?.commentedBy?._id}`} style={{
                     textDecoration:"none"
                  }}>
                  <p
                    style={{
                        fontWeight: "bold",
                        textDecoration:"none"
                    }}
                  >
                    {x.commentedBy.name}
                    </p>
                    </Link>
                  <p>{x.text}</p>
                </div>
              ))}
                  hasBeenCommented={p.hasBeenCommented}
                  id={p._id}
                  likes={p.likes}
                  dislikes={p.dislikes}
                  postedBy={p.postedBy}
                  photo={p.photo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default Profile;