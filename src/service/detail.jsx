import axios from "axios";

export const getReviewProductID = async (productID) => {
    try {
      const res = await axios.get(`http://localhost:8080/reviews/getReviewProduct/${productID}`);
      return res.data.result;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("Không tìm thấy giỏ hàng của user này");
        return null; // hoặc return {}; hoặc return [];
      } else {
        console.error("Lỗi không xác định:", error);
        return null;
      }
    }
  };