import React, { useState,useEffect } from "react";
import "./Purchase.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../service/productService";
import { jwtDecode } from "jwt-decode"; 
import { getOrderDetailsByOrderId, getPayments } from "../../service/ordersService";
import imgEmpty from "../../assets/images/empty.png";
import { updateStatus, updatePaymentStatus, addReview, getReviewUser } from "../../service/purchase";

const tabs = [
  "Tất cả",
  "Chờ thanh toán",
  "Đang vận chuyển",
  "Chờ giao hàng",
  "Hoàn thành",
  "Đã huỷ",
  "Trả hàng/Hoàn tiền",
];

const sidebarMenus = [
  { icon: "🔔", label: "Thông Báo" },
  { icon: "👤", label: "Tài Khoản Của Tôi" },
  { icon: "📦", label: "Đơn Mua", active: true },
  { icon: "🎫", label: "Kho Voucher" },
  { icon: "🪙", label: "Shopee Xu" },
];

export default function Purchase() {
  const [activeTab, setActiveTab] = useState(0); // Mặc định chọn 'Tất cả'
  const token = useSelector(state =>state.auth.token)

  const [decoded, setDecoded] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          setDecoded(decodedToken);

          if (decodedToken.sub !== null) {
            const userData = await getUser(decodedToken.sub);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setDecoded(null);
        setUser(null);
      }
    };

    fetchUser();
  }, [token]);

const [earliestPayments, setEarliestPayments] = useState([]);
useEffect(() => {
  const fetchPaymentsAndDetails = async () => {
    try {
      if (user && user.userId) {
        const payments = await getPayments(user.userId);

        // Lấy 5 đơn thanh toán sớm nhất
        const sortedPayments = payments
          .filter(p => p.paymentDate)
          .sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate))
          .slice(0, 5);

        // Lấy orderId từ mỗi payment
        const detailPromises = sortedPayments.map(payment =>
          getOrderDetailsByOrderId(payment.order.orderId)
        );

        // Gọi tất cả các API lấy chi tiết sản phẩm
        const orderDetailsList = await Promise.all(detailPromises);

        // Gộp payment với danh sách sản phẩm của đơn hàng
        const combined = sortedPayments.map((payment, index) => ({
          payment,
          products: orderDetailsList[index],
        }));
        setEarliestPayments(combined)

      combined.forEach(async (item) => {
        const orderStatus = item.payment.order.status;
        const paymentStatus = item.payment.paymentStatus;
        const orderId = item.payment.order.orderId;

        if (orderStatus === "Hoàn thành" && paymentStatus !== "Đã thanh toán") {
          try {
            await updatePaymentStatus(orderId, "Đã thanh toán");

            // Cập nhật state sau khi gọi API thành công
            setEarliestPayments(prev =>
              prev.map(p =>
                p.payment.order.orderId === orderId
                  ? { ...p, payment: { ...p.payment, paymentStatus: "Đã thanh toán" } }
                  : p
              )
            );
          } catch (err) {
            console.error("Không thể cập nhật trạng thái thanh toán:", err);
          }
        }
      });
        
      }
    } catch (error) {
      console.error("Lỗi khi lấy thanh toán và sản phẩm:", error);
    }
  };

  fetchPaymentsAndDetails();
}, [user]);


  // Hàm lọc đơn hàng theo tab
const getFilteredPayments =  () => {
  if (activeTab === 0) return earliestPayments; // Tất cả

  const tabStatusMap = {
    1: "Chưa thanh toán",
    2: "Đang vận chuyển",
    3: "Chờ giao hàng",
    4: "Hoàn thành",
    5: "Đã huỷ",
    6: "Trả hàng/Hoàn tiền",
  };

  const status = tabStatusMap[activeTab];

  return earliestPayments.filter(item => {
    const paymentStatus = item.payment.paymentStatus;
    const orderStatus = item.payment.order.status;

    switch (status) {
      case "Chưa thanh toán":
        return paymentStatus === "Chưa thanh toán";
      case "Đang vận chuyển":
          return orderStatus === status;
      case "Chờ giao hàng":
          return orderStatus === status;
      case "Hoàn thành":
          return orderStatus === status;
      case "Đã huỷ":
        return orderStatus === status;
      case "Trả hàng/Hoàn tiền":
        return paymentStatus === "Trả hàng/Hoàn tiền" || orderStatus === "Đã huỷ";
      default:
        return true;
    }
  });
};



 const handleCancelOrder = async (item) => {
  try {
    const orderId = item.payment.order.orderId;
    const status = "Đã huỷ";

    const result = await updateStatus(orderId, status);
    if(result) {
    const payments = await updatePaymentStatus(orderId, status)
}
    // Cập nhật trạng thái đơn hàng trong state 
    setEarliestPayments(prev =>
      prev.map(p =>
        p.payment.order.orderId === orderId
          ? { ...p, payment: { ...p.payment, order: { ...p.payment.order, status },
         paymentStatus: status
        } }
          : p
      )
    );
  } catch (error) {
    alert("Có lỗi khi huỷ đơn hàng!");
  }
};

// Thêm hàm xử lý hoàn thành đơn hàng
// const handleCompleteOrder = async (item) => {
//   try {
//     const orderId = item.payment.order.orderId;
//     const status = "Đã thanh toán";
//     await updatePaymentStatus(orderId, status);
//     setEarliestPayments(prev =>
//       prev.map(p =>
//         p.payment.order.orderId === orderId
//           ? { ...p, payment: { ...p.payment, paymentStatus: status } }
//           : p
//       )
//     );
//   } catch (error) {
//     alert("Có lỗi khi cập nhật trạng thái thanh toán!");
//   }
// };


  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewImages, setReviewImages] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Hàm mở modal đánh giá
  const handleOpenReviewModal = (item) => {
    setReviewProduct(item);
    setShowReviewModal(true);
    setReviewText("");
    setReviewRating(0);
    setReviewImages([]);
    setIsAnonymous(false);
  };

  // Hàm đóng modal
  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setReviewProduct(null);
  };

  // Hàm chọn ảnh/video
  const handleImageChange = (e) => {
    setReviewImages([...e.target.files]);
  };

  const[checkReview, setCheckReview] = useState(false);

  // Hàm gửi đánh giá (chỉ demo, bạn cần gọi API thực tế nếu có)
const handleSubmitReview = async (e) => {
  e.preventDefault();
  if (!user || !reviewProduct) return;

  const products = reviewProduct.products;
  if (!products || products.length === 0) return;

  try {
    const uniqueProductIds = [
      ...new Set(products.map(p => p.productVariant.product.productId))
    ];

    for (let productId of uniqueProductIds) {
      const formData = new FormData();

      formData.append("user", user.userId); 
      formData.append("product", productId);  
      formData.append("comment", reviewText);
      formData.append("rating", reviewRating); 
      formData.append("reviewDate", new Date().toISOString().split("T")[0]); 

      if (reviewImages.length > 0) {
        formData.append("image", reviewImages[0]); 
      } else {
        alert("Bạn cần chọn ít nhất 1 ảnh để gửi đánh giá.");
        return;
      }
      const result =await addReview(formData);
      const data = await getReviewUser(user.userId)
      if(data) {
        setCheckReview(true);
      }

      console.log("dữ liệu: ", data)

    }

    alert("Đã gửi đánh giá thành công!");
    handleCloseReviewModal();
  } catch (err) {
    console.error("Lỗi khi gửi đánh giá:", err);
    alert("Gửi đánh giá thất bại!");
  }
};





  return (
    <div className="purchase-layout">
      {/* Sidebar */}
      <div className="purchase-sidebar">
        <div className="sidebar-profile">
         
          <div className="sidebar-username">{decoded?.sub}</div>
          <div className="sidebar-edit">Hồ Sơ</div>
        </div>
        <div className="sidebar-menu">
          {sidebarMenus.map((item, idx) => (
            <div
              key={item.label}
              className={`sidebar-menu-item${item.label === "Đơn Mua" ? " active" : ""}`}
            >
              <span className="sidebar-menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="purchase-main">
        <div className="purchase-tabs">
          {tabs.map((tab, idx) => (
            <div
              key={tab}
              className={`purchase-tab${activeTab === idx ? " active" : ""}`}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="purchase-search-bar">
          <input
            type="text"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
            className="purchase-search-input"
          />
        </div>
        <div className="purchase-content-center">
          {getFilteredPayments().length === 0 ? (
            <div className="empty-order" style={{marginTop: "50px"}} >
              <img
                src= {imgEmpty}
                alt="empty"
              />
              <div>Chưa có đơn hàng</div>
            </div>
          ) : (
            getFilteredPayments().map((item, i) => {
             const orderTotal = item.products.reduce(
                (sum, p) => sum + p.productVariant.price * p.quantity,
                0
              );
                return (
              <div className="order-item" key={i}>
                <div className="order-header">
                  <span className="shop-name">Đơn hàng #{item.payment.order.orderId}</span>
                  <span className="order-status">{item.payment.order.status === "Đã huỷ" ? "Đã huỷ" : item.payment.paymentStatus}</span>
                </div>
                {item.products.map((product, j) => (
                  <div className="order-body" key={j}>
                    <img src={"http://localhost:8080/images/" + product.productVariant.imageUrl || "https://via.placeholder.com/100"}  alt={product.productVariant.productName} className="order-product-img" />
                    <div className="order-product-info">
                      <div className="order-product-name">{product.productVariant.product.name}</div>
                      <div className="order-product-quantity">x{product.quantity}</div>
                    </div>
                    <div className="order-product-price">
                      <span className="old-price">  {(product.productVariant.price).toLocaleString()}₫</span>
                      <span className="price">{product.productVariant.price.toLocaleString()}₫</span>
                    </div>
                  </div>
                 ))}
                <div className="order-footer">
                  <span>Thành tiền: <span className="order-total">{orderTotal.toLocaleString()}₫</span></span>
                  {item.payment.order.status === "Hoàn thành" ? (
                    checkReview ?

                     <button
                      className="order-action-btn"
                     disabled
                    >
                      Đã đánh giá
                    </button>
                    :
                    <button
                      className="order-action-btn"
                      onClick={() => handleOpenReviewModal(item)}
                    >
                      Đánh Giá Sản Phẩm
                    </button>
                  ) : item.payment.order.status === "Đã huỷ" ? (
                    <button
                      className="order-action-btn"
                      disabled
                    >
                      Đã huỷ
                    </button>
                  ) : (
                    <button
                      className="order-action-btn"
                      onClick={() => handleCancelOrder(item)}
                    >
                      Huỷ Đơn Hàng
                    </button>
                  )}
                </div>
              </div>
            )}
          )
          )
          }
        </div>
      </div>

      {/* Modal đánh giá sản phẩm */}
      {showReviewModal && reviewProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={handleCloseReviewModal}>&times;</button>
            <h2>Viết đánh giá</h2>
            <div className="modal-product-info">
              <img
                src={"http://localhost:8080/images/" + reviewProduct.products[0].productVariant.imageUrl}
                alt="product"
                className="modal-product-img"
              />
              <div>
                <div className="modal-product-name">{reviewProduct.products[0].productVariant.product.name}</div>
                <div className="modal-product-variant">Size: {reviewProduct.products[0].productVariant.size}</div>
              </div>
            </div>
            <div className="modal-rating">
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  className={`star${reviewRating >= star ? ' active' : ' inactive'}`}
                  onClick={()=>setReviewRating(star)}
                >&#9733;</span>
              ))}
            </div>
            <form onSubmit={handleSubmitReview}>
              <div style={{marginBottom:10}}>
                <label style={{fontWeight:'bold'}}>Viết đánh giá</label>
                <textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  maxLength={300}
                  placeholder="Chia sẻ suy nghĩ của bạn"
                  className="modal-textarea"
                  required
                />
                <div style={{fontSize:12, color:'#888', textAlign:'right'}}>{reviewText.length}/300</div>
              </div>
              <div style={{marginBottom:10}}>
                <label style={{fontWeight:'bold'}}>Thêm ảnh</label>
                <input type="file" accept="image/*,video/*" multiple onChange={handleImageChange} className="modal-file" />
                <div className="modal-preview-list">
                  {reviewImages && Array.from(reviewImages).map((file, idx) => (
                    <div key={idx} style={{position:'relative'}}>
                      <img src={URL.createObjectURL(file)} alt="preview" className="modal-preview-img" />
                      <span className="modal-preview-remove" onClick={() => {
                        setReviewImages(prev => prev.filter((_, i) => i !== idx));
                      }}>&times;</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="modal-submit-btn"
                disabled={reviewRating === 0 || reviewText.trim() === ""}
              >Gửi</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}