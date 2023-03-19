import React, { useState, useEffect } from "react";
import "./Resources.css";
import axios from "axios";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import SecFooter from "./SecFooter";
import "./Home.css";
import { API } from "./API";


export default function SearchResources() {
  const [univresources, setUnivresources] = useState([]);

  const { search } = useLocation();
  console.log(search);
  const getAllResources = async () => {
    const resources = await axios.post(
      `${API}/getSearched`,
      {
        query: search.replace("?", ""),
      },
      {
        headers: {
          Authorization:localStorage.getItem("jwt"),
        },
      }
    );
    console.log(resources.data);
    setUnivresources(resources.data);
  };

  useEffect(() => {
    getAllResources();
  }, [search]);

  return (
    <div className="resource" style={{ overflowX: "hidden" }}>
      <Header />
      <div className="row">
        <div className="col-md-10 offset-md-1 mt-4 mb-4">
          <h3 className="h">Resources You Searched</h3>
          {univresources.length > 0 ? (
            univresources.map((r) => (
              <div className="resource_univ">
                <p>Uploaded By : {r.resourceUploaderName.name}</p>
                <p>Resource Name:{r.resourcesname}</p>
                <a href={r.resourceUrl} download target="__">
                  <button className="resource_button_new">Get Resource</button>
                </a>
              </div>
            ))
          ) : (
            <h3 className="h">Resources You Searched Wasn't found</h3>
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

// searchuser
