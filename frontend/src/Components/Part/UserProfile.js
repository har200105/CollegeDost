import React from "react";
import Header from "./Header";
import Post from "./Que";
import Answer from "./Answer";
import "./Profile.css";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../ContextProvider/ContextProvider";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import { API } from "./API";
import { useDispatch, useSelector } from "react-redux";
import { getThisUserAllposts, getThisUserUnivposts } from "../../actions/postAction";

const UserProfile = () => {
  
  const dispatch = useDispatch();
  const { search } = useLocation();
  const {posts} = useSelector((state) => state.getThisUserAllPostsReducer);
  const {univposts} = useSelector((state) => state.getThisUserUnivPostsReducer);
  const id = search.replace("?","");
  const [user, setUser] = useState([]);
  
  const getUser=async()=>{
        const u = await axios.get(`${API}/getUserDetailsById/${id}`,{
          headers:{
              "Authorization":localStorage.getItem("jwt"),
            }
        });
        if(u.status===201){
            setUser(u.data);
            console.log(u.data);
        }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    dispatch(getThisUserAllposts(id));
    dispatch(getThisUserUnivposts(id));
  }, [dispatch]);

  var HasPosted = false;
  return (
    <div className="profile">
      
      <Helmet>
      <title>{user.name}</title>
      </Helmet>

      <Header />
      <div className="profile_pg">
        <div className="profile_sidebar">
          <img
            className="profile_pic"
            src={user.avatar ? user.avatar : "https://res.cloudinary.com/harshit111/image/upload/v1627476410/q1rjnignh5djpnujltyy.png"}
            style={{ height: "250px", width: "250px" }}
            alt=""
          />
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>University :{user.university}</div>
          <div> Posts : {posts.length+univposts.length}</div>
        </div>
        <div className="profile_post">
          Questions Posted
          {HasPosted ? (
            <div>No posts from this User</div>
          ) : (
            <div>
            {
              posts.map(p=>(
                <Post
                description={p.body}
            hasbeenCommented={p.hasBeenCommented}
            comments={p.comments.map((x)=>(
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
              ))
            }

            {
              univposts.map(p=>(
                <Post
                description={p.body}
            hasbeenCommented={p.hasBeenCommented}
            comments={p.comments.map((x)=>(
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
              ))
            }
            
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}


export default UserProfile;