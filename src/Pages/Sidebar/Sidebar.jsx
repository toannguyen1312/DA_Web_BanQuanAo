import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { getCategory, getSizes, getColor, getProductByCategory} from "../../service/categoryService"
import { Slider } from "antd";
import colorApi from "../../api/colorApi";
function SideBar({onchangeFilterBar}) {

  const[getAllCategory, setAllCategory] = useState([]);
  const[sizes, setSizes] = useState([]);
  const[colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);


  const handleCategoryClick = async (categoryId) => {
  const updatedCategories = selectedCategories.includes(categoryId)
  ? selectedCategories.filter(id => id !== categoryId)
  : [...selectedCategories, categoryId];
  setSelectedCategories(updatedCategories);

  let allProducts = [];

  for (const id of updatedCategories) {
    const products = await getProductByCategory(id);
    allProducts = [...allProducts, ...products];
  }
  
// xóa sản phẩm đã trùng
  const uniqueProducts = Array.from(
    new Map(allProducts.map(item => [item.productId, item])).values()
  );
  setCategoryProducts(uniqueProducts); // lưu tất cả sản phẩm từ category
  applyFilters(uniqueProducts, selectedColor, selectedSize);
  };



  // hiển thị giao diện category color size
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategory(); 
      const size = await getSizes();
      const color = await getColor();
      setAllCategory(data);
      setSizes(size)
      setColors(color)
    };
    fetchCategory();
  }, []);

  
  const handleColorClick = (color) => {
    const newColor = selectedColor === color ? "" : color;
    setSelectedColor(newColor);
    applyFilters(categoryProducts, newColor, selectedSize);
  };
  

  const handleSizeClick = (size) => {
    const newSize = selectedSize === size ? "" : size;
    setSelectedSize(newSize);
    applyFilters(categoryProducts, selectedColor, newSize);
  };


  const applyFilters = (products, color, size) => {
    let filtered = products;
  
    if (color) {
      filtered = filtered.filter(product =>
        product.colors?.some(c => c.color === color)
      );
    }
  
    if (size) {
      filtered = filtered.filter(product =>
        product.colors?.some(c => c.sizes?.includes(size))
      );
    }
  
    setSelectedProducts(filtered);
    onchangeFilterBar(filtered);
  };
  
  


  // làm mới khi chọn
  const handleReset = () => {
    setSelectedProducts([]);
    setSelectedColor("");
    setSelectedSize("");
    setSelectedCategories([]);
    // Gọi lại filter với tất cả sản phẩm từ các category
    applyFilters(categoryProducts, "", ""); // Thêm filter mặc định
  };
  

  
    return (
        <div className="pt-4 rounded-4 border border-light">
          <div className="pb-4 mb-4 mb-4 border-bottom border-light">
            <Button
              style={{ 
                height: "36px",
                padding: "0 16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontWeight: "500",
                fontSize: "14px",
                transition: "all 0.3s",
              }}
              onClick={() => {
                handleReset()
              }}
              className="bg-transparent text-dark"
            >
            Làm Mới
            </Button>
          </div>
          <div className=" mb-2 pb-4 border-light">
                <h4 className=" mb-3">Thể Loại</h4>
                {getAllCategory.length > 0 ? (
                  getAllCategory.map((category) => (
                    <div className="form-check mb-2" key={category.categoryId} style={{paddingLeft:"40px"}}>
                      <input
                        id={`category-${category.categoryId}`}
                        type="checkbox"
                        className="form-check-input"
                        style={{ opacity: 1, background: 'none', pointerEvents: 'auto' }}
                        value={category.categoryId}
                        checked={selectedCategories.includes(category.categoryId )} 
                        onChange={() => handleCategoryClick(category.categoryId)}
                        
                      />
                      <label
                        className="form-check-label"
                        style={{whiteSpace: "nowrap"}}
                        // htmlFor={`category-${category.categoryId}`}
                      >
                        {category.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p>Không có thể loại nào.</p>
                  </div>
                )}
          </div>
          <div className="mb-4 pb-4 border-bottom border-light">
            <h4 className="mb-3">Màu</h4>
            <ul
              className="list-inline"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
                gap: "12px",
                paddingLeft: "0",
                justifyItems: "center",
              }}
            >
              {colors.map((col, index) => (
                <li
                  key={index}
                  style={{
                    listStyle: "none",
                    textAlign: "center",
                  }}
                >
                  <label
                    htmlFor={`color-${index}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      id={`color-${index}`}
                      name="color"
                      type="radio"
                      value={col}
                      onChange={() => handleColorClick(col)}
                      checked={selectedColor === col}
                      style={{ display: "none" }}
                    />
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "6px",
                        backgroundColor: colorApi[col] || "#ccc",
                        border: selectedColor === col ? "2px solid #007bff" : "1px solid #ccc",
                      }}
                    ></div>
                    <small style={{ fontSize: "12px", marginTop: "6px" }}>{col}</small>
                  </label>
                </li>
              ))}
            </ul>
          </div>


          <div className="mb-4 pb-4 border-bottom border-light widget-size">
            <h4 className=" mb-3">Size</h4>
            <div
              className="pl-0"
              style={{
                display: "grid",
                justifyContent: "center",
                height: "40px",
                gridTemplateColumns: "repeat(5, 1fr)", 
                gridAutoFlow: "column",
                paddingBottom: "5px",
                gap: "5px",
              }}
            >
             {sizes.map((size, index) => (
                <li key={index}>
                  <input
                    name="sc"
                    type="checkbox"
                    onChange={() => handleSizeClick(size)}
                    checked={selectedSize === size}
                    value={size}
                    id={size}
                    style={{ display: "none" }} 
                  />
                  <label
                    htmlFor={size}
                    style={{
                      display: "inline-block",
                      border: selectedSize === size ? "2px solid #007bff" : "1px solid #ccc",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      backgroundColor: selectedSize === size ? "#e7f1ff" : "#fff",
                    }}
                  >
                    {size}
                  </label>
                </li>
              ))}

            </div>
          </div>
        </div >
      );
}

export default SideBar