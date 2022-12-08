import React, { useState, useEffect } from "react";
import "./Resources.css";
import { useCallback } from "react";
import axios from "axios";
import Dropzone from "./Dropzone";
import Header from "./Header";
import { Link } from "react-router-dom";
import DownloadLink from "react-download-link";
import Footer from "./Footer";
import SecFooter from "./SecFooter";
import "../Screens/Home.css";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { API } from "./API";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Resources() {
  const [univresources, setUnivresources] = useState([]);
  const [opend, setOpend] = useState(false);
  const [open, setOpen] = useState(false);


  const handleClosed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpend(false);
  };

  
  const handleClickd = () => {
    setOpend(true);
  };



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  
  const handleClick = () => {
    setOpen(true);
  };


  const getAllResources = async () => {
    const resources = await axios.get(
      `${API}/getResources`,
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );

    console.log(resources.data);

    setUnivresources(resources.data.Recentresources);
  };

  useEffect(() => {
    getAllResources();
  }, [univresources]);

  const [resourceName, setResourceName] = useState("");
  const [fileurl, setFileUrl] = useState("");
  const [manualurl, setManualUrl] = useState("");

  const uploadFile = async (file) => {
    console.log(file);
    const data = new FormData();
    await data.append("file", file);
    data.append("upload_preset", "collegedost");
    data.append("cloud_name", "CollegeDost");
    fetch("https://api.cloudinary.com/v1_1/collegedost/raw/upload ", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {

        console.log(data.secure_url);
        setFileUrl(data.secure_url);
        handleClick();
      });
  };

  const uploadResource = async () => {
    const uploadingResource = await axios.post(
      `${API}/addResources`,
      {
        resourcesname: resourceName,
        resourceUrl: fileurl === "" ? manualurl : fileurl,
      },
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );
    if (uploadingResource.status === 201) {
      handleClickd();
      console.log("Resource Uploaded");
      setManualUrl("");
      setResourceName("");
      setFileUrl("");
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log("File accepted.....");
    console.log(acceptedFiles);
    console.log(acceptedFiles[0].path);
    uploadFile(acceptedFiles[0]);
  });
  return (
    <div className="resource">
      <Helmet>
        <title>Resources</title>
      </Helmet>
      <Header />
      <h1></h1>
      <div className="drop_zone">
        <h2 className="text-center">Add Resource</h2>
        <input
          type="text"
          placeholder="Enter Resource Name"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
        />

<Snackbar open={opend} autoHideDuration={3000} onClose={handleClosed}>
          <Alert onClose={handleClosed} severity="info">
            Resource Added
          </Alert>
        </Snackbar>


        
<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            Resource Uploaded
          </Alert>
        </Snackbar>

        <Dropzone className="drop" onDrop={onDrop} />
        <input
          placeholder="Paste the link of the resource here...."
          name="resource"
          value={manualurl}
          style={{
            marginTop: "10px",
          }}
          onChange={(e) => setManualUrl(e.target.value)}
        />
        <button className="resource_button" onClick={uploadResource}>
          Upload Resource
        </button>
      </div>
      <h3 className="h">Resources Uploaded Recently</h3>

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            className="spinner-border spinner-border-md text-center"
            style={{
              height: "100px",
              width: "100px",
            }}
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      )}

      <div className="footer-huge">
        <Footer />
      </div>
      <div className="footer-small">
        <SecFooter />
      </div>
    </div>
  );
}
