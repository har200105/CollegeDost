import React, { useState } from "react";
import "./Admin.css";
import Header from "./Header";
import AdminPost from "./AdminPost";
import User from "./User";
import axios from "axios";
import Helmet from "react-helmet";
import { useEffect } from "react";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { API } from "./API";
export default function Admin() {
  const [user, setUser] = useState([]);
  const [usersr, setUserSearch] = useState("");
  const [getPosts, setPosts] = useState([]);

  const getAdminPosts = async () => {
    const getPosts = await axios.get(`${API}/getAdminPosts`);
    if (getPosts.status === 201) {
      setPosts(getPosts.data);
      console.log(getPosts.data);
    }
  };
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    history.push("/Login");
  };

  const getUser = async () => {
    const getUsers = await axios.post(`${API}/searchuser`, {
      query: usersr,
    });
    console.log(getUsers.data);
    setUser(getUsers.data.user);
  };

  useEffect(() => {
    getAdminPosts();
  }, []);

  return (
    <div className="admin">
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <Header />
      <div className="admin_content">
        <div className="admin_sidebar">
          <div className="admin_post_search">
            <input
              type="text"
              placeholder="write initials of User"
              value={usersr}
              onChange={(e) => setUserSearch(e.target.value)}
            />
            <button className="logout" onClick={() => getUser()}>
              Search
            </button>
            {user && user.map((i) => <User u={i} />)}
          </div>
        </div>
        <div className="admin_feed">
          <div className="admin_post_search">
            <input type="text" placeholder="write initials of title" />
            <button className="logout" onClick={""}>
              Search
            </button>
          </div>
          {getPosts.map((g) => (
            <AdminPost post={g} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
