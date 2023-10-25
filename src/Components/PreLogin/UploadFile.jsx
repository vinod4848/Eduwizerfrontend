import React, { useState } from "react";
import { Input, Label } from "reactstrap";
import { uploadCVAPI } from "../../Services/api";

const UploadFile = ({ uploadFileProp, editData, accept }) => {
  const [localUrl, setLocalUrl] = useState(editData.url);
  const [fileType, setFileType] = useState(editData.fileType);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("admin", true);
    formData.append("file", e.target.files[0]);
    setFileType(file.type);
    setLocalUrl(URL.createObjectURL(file));
    const uploadCvResponse = await uploadCVAPI(formData);
    const url = uploadCvResponse.data.data;
    // let url =
    //   "https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg";
    uploadFileProp(file, url, file.type);
  };

  {
    console.log("fileType==", fileType);
  }
  {
    console.log("localUrl==", localUrl);
  }

  return (
    <>
      <Input
        accept={accept}
        multiple={false}
        type="file"
        name="file"
        id="exampleFile"
        onChange={(e) => {
          handleFile(e);
        }}
      />
    </>
  );
};

export default UploadFile;
