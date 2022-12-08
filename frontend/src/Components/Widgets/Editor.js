import React,{useState,useEffect} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import axios from "axios";
import {API} from './API';

export const Editor = (props) => {
  const[caption,setCaption]=useState("");
  const[shareImage,setShareImage] =  useState("");
  const[pic,setPic]= useState("");
  const postQuestion = async (e) => {
    e.preventDefault();
    let urlToPost = "";
    !props.university
      ? (urlToPost = `${API}/createglobalpost`)
      : (urlToPost = `${API}/createuniversitypost`);

    !props.university
      ?  await axios.post(urlToPost,{ 
        body: caption,
        hashtag:caption.match(/#\w+/g),
        pic:pic 
      },
          {
            headers: {
              Authorization: "CollegeDost " + localStorage.getItem("jwt"),
            },
          }
        ).then((e)=>{
          if(e){
            setShareImage("");
            setPic("");
            setCaption("");
          }
        })
      : await axios.post(
          urlToPost,
          {
            body: caption,
            pic:pic,
            hashtag:caption.match(/#\w+/g),
          },
          {
            headers: {
              Authorization: "CollegeDost " + localStorage.getItem("jwt"),
            },
          }
        ).then((e)=>{
          if(e){
            setShareImage("");
            setPic("");
            setCaption("");
          }
        });

        setShareImage("");
          setPic("");
          setCaption("");
  };
  const handleChange = (value) => {
    setCaption(value);
    console.log(value);
  };



  
  const uploadingPic = async()=>{
      const data = new FormData();
      await data.append("file",shareImage);
       data.append("upload_preset","collegedost");
       data.append("cloud_name","CollegeDost");
       fetch("https://api.cloudinary.com/v1_1/collegedost/raw/upload",{
         method:"post",
         body:data
       }
       ).then(res=>res.json()).then(data=>{
         console.log(data);
         setPic(data.url); 
       });
  }

  
  const reset=(e)=>{
      console.log(e);
      setShareImage("");
      setPic("");
      setCaption("");
  }






  useEffect(()=>{
      if(shareImage!==""){
          uploadingPic();
      }
  },[pic,shareImage])

  const handleChanges = (e)=>{
      const images =  e.target.files[0];
      if(images==="" || images===undefined){
      }
      setShareImage(images);
  }

  return (
    <div className="text-editor">
      <textarea
      onChange={(e)=>handleChange(e.target.value)}
        value={caption}
        rows="8"
        cols="70"
        className="text-areas"
        placeholder="Write a new question here....."
      ></textarea>
      
      <button className="post" onClick={(e) => postQuestion(e)}>
        Post
      </button>

      <input
      type="file"
      id="image"

      style={{
        float:"right !important",
        display:"none"
      }}
      onChange={(e)=>handleChanges(e)}
      />
      <label  htmlFor="image">
      <AddPhotoAlternateIcon  style={{
         color:"blue",
         float:"right !important",
         magrin:"20px",
         cursor:"pointer"
      }}/>
      </label>
      {shareImage && <img src = {pic}  height="100px" width="150px"  alt=""/>} 
    </div>
  );
};

export default Editor;
