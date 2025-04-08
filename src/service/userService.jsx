import axios from "axios";

export const checkUsernameExists = async (username) => {
    try {
      const res = await axios.post(`http://localhost:8080/users/checkUserName/${username}`);
      console.log(res.data.result)
      return res.data.result;
    } catch (error) {
      console.error("Lỗi kiểm tra username:", error);
      return res.data;
    }
  }; 