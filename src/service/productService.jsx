import axios from "axios";

export const getProduct = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/products/getByProduct/${id}`);
      return res.data.result;
    } catch (error) {
      console.error("Lỗi kiểm tra categoryID:", error);
      return [];
    }
  }; 

  export const getUser = async (username) => {
    try {
      const res = await axios.get(`http://localhost:8080/users/getUserByUsername/${username}`);
      return res.data.result;
    } catch (error) {
      console.error("Lỗi kiểm tra categoryID:", error);
      return [];
    }
  }; 


  export const getProductVariant = async (productID) => {
    try {
      const res = await axios.get(`http://localhost:8080/productVariant/getByProductId/${productID}`);
      return res.data.result;
    } catch (error) {
      console.error("Lỗi kiểm tra categoryID:", error);
      return [];
    }
  }; 

