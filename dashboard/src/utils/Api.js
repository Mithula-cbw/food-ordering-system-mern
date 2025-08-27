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
    console.log(`📤 POST Request to: http://localhost:4000${url}`);
    console.log("📦 Request Body:", formData);

    const { data } = await axios.post(`http://localhost:4000${url}`, formData);

    console.log("📥 API Response:", data); // ✅ Check API response
    return data;
  } catch (error) {
    console.error("🔥 Post error:", error);

    if (error.response) {
      console.log("🚨 Error Response:", error.response.data);
      return error.response.data; // ✅ Return error response instead of `null`
    }

    return { status: false, msg: "Network error! Server might be down." }; // ✅ Fallback error message
  }
};

// export const editData = async (url, updateData) => {
//   const { res } = await axios.put(`http://localhost:4000${url}`, updateData);
//   return res;
// };
// export const deleteData = async (url) => {
//   const { res } = await axios.delete(`http://localhost:4000${url}`);
//   return res;
// };

export const editData = async (url, updateData) => {
  try {
    const { data } = await axios.put(`http://localhost:4000${url}`, updateData);
    return data;
  } catch (error) {
    console.error("Edit error:", error);
    return null;
  }
};

export const deleteData = async (url) => {
  try {
    const { data } = await axios.delete(`http://localhost:4000${url}`);
    return data;
  } catch (error) {
    console.error("Delete error:", error);
    return null;
  }
};
