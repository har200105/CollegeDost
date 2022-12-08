import React from "react";
import Header from "../Widgets/Header";
import Post from "./Que";
// import Answer from "./Answer";
import "./Profile.css";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../ContextProvider/ContextProvider";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../Widgets/Footer";
import { API } from "../Widgets/API";
const  UserProfile=() =>{
    const {account,setAccount} = useContext(LoginContext);
    const{search}=useLocation();
    console.log(search);
    const id = search.replace("?","");
    const[user,setUser] = useState([]);
    const[posts,setUserPosts]=useState([]);
    const[univ,setUniv]=useState([]);
    const getUserposts=async()=>{
        const pi = await axios.get(`${API}/getUserPostById/${id}`,{
            headers:{
                "Authorization": "CollegeDost " + localStorage.getItem("jwt"),
            }
        });
        
        if(pi.status===201){
            setUserPosts(pi.data);
            console.log(pi.data);
        }

        const pis = await axios.get(`${API}/getUnivUserPostById/${id}`,{
          headers:{
            "Authorization": "CollegeDost " + localStorage.getItem("jwt"),
          }
        });
    
        if(pis.status===201){
          setUniv(pis.data);
          console.log(pis.data);
        }


        const u = await axios.get(`${API}/getUserDetailsById/${id}`,{
          headers:{
              "Authorization": "CollegeDost " + localStorage.getItem("jwt"),
            }
        });
        if(u.status===201){
            setUser(u.data);
            console.log(u.data);
        }


  }



  
  useEffect(()=>{
    getUserposts();
  },[])
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
          <div>{user.university}</div>
          <div> Posts : {posts.length+univ.length}</div>
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
              <p style={{
                fontWeight:"bold"
              }}>{x.commentedBy.name}</p>
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
              univ.map(p=>(
                <Post
                description={p.body}
            hasbeenCommented={p.hasBeenCommented}
            comments={p.comments.map((x)=>(
              <div>
              <p style={{
                fontWeight:"bold"
              }}>{x.commentedBy.name}</p>
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