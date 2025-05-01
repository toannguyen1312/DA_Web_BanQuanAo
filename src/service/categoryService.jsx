import axios from "axios";

export const getProductByCategory = async (categoryID) => {
    try {
      const res = await axios.get(`http://localhost:8080/products/getAllCategoryID/${categoryID}`);
      return res.data.result;
    } catch (error) {
      console.error("Lỗi kiểm tra categoryID:", error);
      return [];
    }
  }; 

export const getAllProduct = async (categoryID) => {
  try {
    const res = await axios.get(`http://localhost:8080/products/getAllProducts`);
    return res.data.result;
  } catch (error) {
    console.error("Lỗi kiểm tra categoryID:", error);
    return [];
  }
}; 

export const getCategory = async() => {
  try{
    const response = await axios.get(`http://localhost:8080/category/getAllCategory`)
    return response.data.result;
  }catch(error) {
    return [];
  }
}

export const getSizes = async() => {
  try{
    const response = await axios.get(`http://localhost:8080/productVariant/getAllSizes`)
    return response.data.result
  }catch(error) {
    return [];
  }
}

export const getColor = async() => {
  try{
    const response = await axios.get(`http://localhost:8080/productVariant/getAllColor`)
    return response.data.result
  }catch(error) {
    return [];
  }
}