import axios from "axios";

export const createOrders = async (order) => {
    try {
      const res = await axios.post(`http://localhost:8080/orders/createOrders`, order);
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


  export const createOrderDetails = async (orderDetails) => {

    try {
      const result = await axios.post(`http://localhost:8080/orderDetail/createOrderDetails`, orderDetails);
      return result.data.result;
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

  export const deleteCartItem = async (cart) => {

    try {
      const result = await axios.delete(`http://localhost:8080/cartItems/deleteCartItemsByCartId/${cart}`);
      return result.data.result;
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

   export const getOrderDetailsByOrderId = async (orderid) => {
    try {
      const res = await axios.get(`http://localhost:8080/orderDetail/getByOrderDetailId/${orderid}`);
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


  export const updateOrders = async (order) => {
    try {
      const res = await axios.put(`http://localhost:8080/orders/updateOrders`, order);
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


export const updateProductVariantsStock = async (variantList) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/productVariant/updateStock",
      variantList
    );
    return res.data.result;
  } catch (error) {
    console.error("Lỗi khi cập nhật tồn kho:", error);
    return null;
  }
};


export const createPayment = async (payment) => {
  try {
    const res = await axios.post("http://localhost:8080/payments/createPayments", payment);
    return res.data.result;
  } catch (error) {
    console.error("Lỗi khi tạo payment:", error);
    return null;
  }
};


export const getPayments = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8080/payments/byUserId/${userId}`);
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


  export const getAllPayments = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/payments/getAllPayments`);
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


   export const deleteOrder = async (orderId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/orders/${orderId}`);
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