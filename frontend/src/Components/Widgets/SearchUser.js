import React, { useState, useEffect } from "react";
import "./Resources.css";
import { useCallback } from "react";
import axios from "axios";
import Dropzone from "./Dropzone";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import DownloadLink from "react-download-link";
import Footer from "./Footer";
import SecFooter from "./SecFooter";
import "./Home.css";
import { API } from "./API";
export default function SearchUser() {
  const [univresources, setUnivresources] = useState([]);

  const { search } = useLocation();
  console.log(search);
  const getAllResources = async () => {
    const resources = await axios.post(
      `${API}/searchuser`,
      {
        query: search.replace("?", ""),
      }
    );
    console.log(resources.data);
    setUnivresources(resources.data.user);
  };

  useEffect(() => {
    getAllResources();
  }, [search]);

  return (
    <div className="resource" style={{ overflowX: "hidden" }}>
      <Header />
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h3 className="h">Users Matched</h3>
          {univresources.length > 0 ? (
            univresources.map((r) => (
              <div className="user_uni resource_univ mt-4 mb-4">
                <Link
                  style={{
                    textStyle: "none",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "2rem",
                    color: "#b5e48c",
                  }}
                  to={`/user/?${r._id}`}
                >
                  <p>{r.name}</p>
                </Link>
                <p style={{ color: "#b5e48c", fontWeight: "500" }}>
                  University : {r.university}
                </p>
                {/* <Link to="">
                  <button
                    className="btn btn-block btn-primary"
                    style={{
                      background: "#006A81",
                      border: "2px solid black",
                      color: "color",
                    }}
                  >
                    
                  </button>
                </Link> */}
              </div>
            ))
          ) : (
            <h3 className="h">Users You have searched Not found</h3>
          )}
        </div>
        <div className="col-md-1" style={{ height: "51vh" }}></div>
      </div>
      <div className="footer-huge">
        <Footer />
      </div>
      <div className="footer-small">
        <SecFooter />
      </div>
    </div>
  );
}
