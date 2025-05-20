import axios from "axios";

export const getOrder = async (userID) => {
    try {
      const res = await axios.get(`http://localhost:8080/orders/OrderUer/${userID}`);
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

export const updateStatus = async (orderId, status) => {
  try {
    const res = await axios.put(`http://localhost:8080/orders/updateStatus/${orderId}/${status}`);
    return res.data.result;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Không tìm thấy đơn hàng");
      return null;
    } else {
      console.error("Lỗi không xác định:", error);
      return null;
    }
  }
};

export const updatePaymentStatus = async (orderId, status) => {
  try {
    const res = await axios.put(`http://localhost:8080/payments/updatePaymentStatus/${orderId}/${status}`);
    return res.data.result;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Không tìm thấy đơn hàng");
      return null;
    } else {
      console.error("Lỗi không xác định:", error);
      return null;
    }
  }
};

export const addReview = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:8080/reviews/createReview`, formData);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);
    throw error;
  }
};

export const getReviewUser = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:8080/reviews/getReviewUser/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);
    throw error;
  }
};




