import axios from "axios";

export const getCart = async (userID) => {
    try {
      const res = await axios.get(`http://localhost:8080/carts/checkCartByUser/${userID}`);
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


  export const createCart = async (cart) => {
    try {
      const res = await axios.post(`http://localhost:8080/carts/createCart`, cart);
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


  export const getVariantProduct = async (productID, size, color) => {
    try {
      const res = await axios.get(`http://localhost:8080/productVariant/getColorSize/${productID}/${size}/${color}`);
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

  export const createCartIem = async (cartItem) => {
    try {
      const res = await axios.post(`http://localhost:8080/cartItems/createCartItem`, cartItem);
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


 
  
  