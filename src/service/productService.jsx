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



export const searchProducts = async (name, categoryId) => {
  try {
    const params = { name };
    if (categoryId) params.categoryId = categoryId;
    const res = await axios.get(`http://localhost:8080/products/search`, { params });
    return res.data.result;
  } catch (error) {
    console.error("Lỗi search sản phẩm:", error);
    return [];
  }
}; 


export const getByYear = async (year) => {
  try {
    const res = await axios.get(`http://localhost:8080/products/getByYear/${year}`);
    return res.data.result;
  } catch (error) {
    console.error("Lỗi search sản phẩm:", error);
    return [];
  }
}; 


export const getBestSellerProduct = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/products/best-selling`);
    return res.data.result;
  } catch (error) {
    console.error("Lỗi search sản phẩm:", error);
    return [];
  }
}; 

// API lấy danh sách sản phẩm có khuyến mãi
export const getDiscountedProducts = async () => {
  try {
    const res = await axios.get("http://localhost:8080/products/discount");
    return res.data.result;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm giảm giá:", error);
    return [];
  }
};


