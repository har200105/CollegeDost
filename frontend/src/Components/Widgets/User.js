import React from "react";
import "./Admin.css";
import BlockIcon from "@material-ui/icons/Block";
import axios from "axios";
import { API } from "./API";
export default function User(props) {
  const deleteUser=async()=>{
    const deleteUser = await axios.post(`${API}/deleteUser`,{
      query:props.u._id
    });

    if(deleteUser.status===201){
      console.log("User Deleted");
    }

  }
  return (
    <div className="user">
      <div className="userid">{props.u.name}</div>
      <button>
        <BlockIcon onClick={()=>deleteUser()} />
      </button>
    </div>
  );
}