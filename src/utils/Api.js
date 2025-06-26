import axios from "axios";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(`http://localhost:4000${url}`);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export const postData = async (url, formData) => {
  try {
    console.log("Sending this data:", formData);
    console.log(`POST Request to: http://localhost:4000${url}`);
    const { data } = await axios.post(`http://localhost:4000${url}`, formData);
    return data;
  } catch (error) {
    console.error("Post error:", error);
    return null;
  }
};
export const editData = async (url, updateData) => {
  const { res } = await axios.put(`http://localhost:4000${url}`, updateData);
  return res;
};
export const deleteData = async (url) => {
  const { res } = await axios.delete(`http://localhost:4000${url}`);
  return res;
};
