import React, { useState } from "react";
import styles from "@/styles/ImageUpload.module.css";
import { API_URL } from "@/config/config";
import { toast, ToastContainer } from "react-toastify";
export default function ImageUpload({id}) {
  const [image, updateImage] = useState(null);
  const hanldeImageUpload = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('files', image);
      formData.append('ref','orders');
      formData.append('redId', id);
      formData.append('field', 'image');

      const res = await fetch(`${API_URL}/upload`,{
          method: 'POST',
          body: formData
      });
      if(res.ok){
        console.log('Upload Success')
        toast.success('Image updated sucessfully')
      } else {
          toast.error(res.message);
      }
  };

  const hanldeOnChange = (event) => {
    updateImage(event.target.files[0]);
  };

  return (
    <div className={styles.imageUploadContainer}>
      <input type="file" name="image" onChange={hanldeOnChange} />
      <div className={styles.uploadButton} onClick={hanldeImageUpload}>
        Upload
      </div>
      <ToastContainer />
    </div>
  );
}
