import React from "react";
import { useDropzone } from "react-dropzone";
import "./Resources.css";
const Dropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content" style={{ color: "white" }}>
            Release to drop the files here
          </p>
        ) : (
          <p className="dropzone-content" style={{ color: "white" }}>
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
