// src/services/itemService.js
import axios from "axios";

const BASE_URL = "http://192.168.3.113:3000/api/items";

export const fetchItems = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addItem = async (item) => {
  console.log(item);
  
  return await axios.post(BASE_URL, item, {
    headers: { "Content-Type": "application/json" },
  });
};

export const updateItem = async (id, item) => {
  return await axios.put(`${BASE_URL}/${id}`, item, {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteItem = async (id) => {
  console.log(id);
  
  return await axios.delete(`${BASE_URL}/${id}`);
};
// Fetch a single item by itemNumber
export const fetchItemByNumber = async (itemNumber) => {
  try {
    const res = await axios.get(`${BASE_URL}/itemNumber/${itemNumber}`);
    console.log(res.data);
    
    return res.data; // ✅ Axios gives data directly
  } catch (error) {
    console.error("Error fetching item by number:", error);
    throw error;
  }
};

