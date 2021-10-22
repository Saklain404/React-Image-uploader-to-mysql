import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import axios from "axios";



function App() {
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const [isSucces, setSucces] = useState(null);

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const submit = async () => {
    const formdata = new FormData();
    formdata.append("avatar", userInfo.file);
    axios.post("http://localhost:8080/imageupload", formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
    })  
      .then(res => {
        console.log(res);
        if (res.data.success === 1) {
          setSucces("Image Upload Successfully");
        }
      });
  };
  return (
    <div className="container mr-60">
      <h3 className="text-white">React Image Uploader using Node.js</h3>
      <div className="formdesign">
        {isSucces !== null ? <h4>{isSucces}</h4> : null}
        <div className="form-row">
          <label>Select Image :</label>
          <input
            type="file"
            className="form-control pb-5"
            name="upload_file"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={() => submit()}
          >
            
            Save
          </button>
        </div>
      </div>
      {userInfo.filepreview !== null ? (
        <img
        style={{width: "30%", height:"30%"}}
          className="previewing mt-5"
          src={userInfo.filepreview}
          alt="uploadImage"
        />
      ) : null}
    </div>
  );
}

export default App;
