import React from "react";
import Header from "../Widgets/Header";
import Post from "./Que";
import "./Profile.css";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../ContextProvider/ContextProvider";
import axios from "axios";
import Footer from "../Widgets/Footer";
import { Helmet } from "react-helmet";
import CollegeQuestion from "./CollegeQuestion";
import { API } from "../Widgets/API";
export default function Profile() {
  const { account, setAccount } = useContext(LoginContext);
  const [user, setUser] = useState([]);
  const [posts, setUserPosts] = useState([]);
  const [univ, setUniv] = useState([]);
  const getUserposts = async () => {
    const pi = await axios.get(
      `${API}/getUserPost`,
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );

    if (pi.status === 201) {
      setUserPosts(pi.data);
      console.log(pi.data);
    }

    const pis = await axios.get(
      `${API}/getUnivUserPost`,
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );
    console.log("user");
    if (pis.status === 201) {
      setUniv(pis.data);
      console.log("univ : " + pis.data);
    }
  };
  useEffect(() => {
    getUserposts();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
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
              user.avatar
                ? user.avatar
                : "https://res.cloudinary.com/harshit111/image/upload/v1627476410/q1rjnignh5djpnujltyy.png"
            }
            style={{ height: "250px", width: "250px" }}
            alt=""
          />
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.university}</div>
          <div> Posts : {posts.length + univ.length}</div>
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
                  comments={p.comments.map((x) => (
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {x.commentedBy.name}
                      </p>
                      <p>{x.text}</p>
                    </div>
                  ))}
                  id={p._id}
                  likes={p.likes}
                  dislikes={p.dislikes}
                  postedBy={p.postedBy}
                />
              ))}

              {univ.map((p) => (
                <CollegeQuestion
                  description={p.body}
                  comments={p.comments.map((x) => (
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {x.commentedBy.name}
                      </p>
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
        {/* <div className="ad101">AD bolte</div> */}
      </div>
      <Footer />
    </div>
  );
}
