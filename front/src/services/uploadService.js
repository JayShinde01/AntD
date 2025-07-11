// src/services/uploadService.js
import axios from "axios";

const UPLOAD_URL = "https://ambika-spare-parts.onrender.com/api/upload";

export const uploadImage = async (file, itemNumber) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("itemNumber", itemNumber);

  return await axios.post(UPLOAD_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
