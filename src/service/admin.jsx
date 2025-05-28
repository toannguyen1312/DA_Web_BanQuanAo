import axios from "axios";

export const getAllUser = async (token) => {
    console.log("token: ", token)
    try {
      const res = await axios.get(`http://localhost:8080/users/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("dữ liệu: ", res.data.result)
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


  export const updateUser = async (data) => {
    try {
      const res = await axios.put(`http://localhost:8080/users/updateUser`, data);
      console.log("dữ liệu: ", res.data.result)
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

   export const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/users/updateUser/${userId}`);
      console.log("dữ liệu: ", res.data.result)
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



  // order

  
   export const OrderUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/orders/getAllOrders`);
      console.log("dữ liệu: ", res.data.result)
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


  // category
    export const getAllCategorys = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/category/getAllCategoryDetails`);
      console.log("dữ liệu: ", res.data.result)
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

export const addCategorys = async (data) => {
  try {
    const res = await axios.post(`http://localhost:8080/category/createCategory`, data);
    console.log("Dữ liệu thêm mới: ", res.data.result);
    return res.data.result;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Không tìm thấy API");
      return null;
    } else {
      console.error("Lỗi không xác định:", error);
      return null;
    }
  }
};

  export const deleteCategorys = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8080/category/deleteCategory/${id}`);
    return res.status === 200;
  } catch (error) {
    console.error('Lỗi khi xóa danh mục:', error);
    return false;
  }
};



export const updateCategorys = async (categoryId, newCategory) => {
  try {
    const res = await axios.put(`http://localhost:8080/category/updateCategory/${categoryId}`, newCategory);
    console.log("Dữ liệu thêm mới: ", res.data.result);
    return res.data.result;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Không tìm thấy API");
      return null;
    } else {
      console.error("Lỗi không xác định:", error);
      return null;
    }
  }
};

// productVariant


export const getAllProductVariant = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/productVariant/getAllProductVariant`);
    console.log("Dữ liệu thêm mới: ", res.data.result);
    return res.data.result;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Không tìm thấy API");
      return null;
    } else {
      console.error("Lỗi không xác định:", error);
      return null;
    }
  }
};

// voucher
export const addToVoucher = async (data) => {
  try {
    const res = await axios.post(`http://localhost:8080/coupons/createCoupon`, data);
    console.log("Dữ liệu thêm mới: ", res.data.result);
    return res.data.result;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Không tìm thấy API");
      return null;
    } else {
      console.error("Lỗi không xác định:", error);
      return null;
    }
  }
};

export const getAllVoucher = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/coupons/getAllCoupons`);
    console.log("Dữ liệu thêm mới: ", res.data.result);
    return res.data.result;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Không tìm thấy API");
      return null;
    } else {
      console.error("Lỗi không xác định:", error);
      return null;
    }
  }
};


export const deleteVoucher = async (couponsID) => {
  try {
    const res = await axios.delete(`http://localhost:8080/coupons/deleteCoupon/${couponsID}`);
    console.log("Dữ liệu thêm mới: ", res.data.result);
    return res.data.result;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Không tìm thấy API");
      return null;
    } else {
      console.error("Lỗi không xác định:", error);
      return null;
    }
  }
};






  
