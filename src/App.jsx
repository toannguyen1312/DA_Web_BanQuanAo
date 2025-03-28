import { useState } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {

  const location = useLocation();

  // kiểm tra xem người dùng có vào trang đặt biệt này không
  const isSpecialRoute =
  location.pathname.includes("maintenance") ||
  location.pathname.includes("coming-soon") ||
  location.pathname.includes("error-404");

  // useEffect(() => {
  //   const handlePopstate = () => {
  //     window.location.reload(); // Làm mới trang khi sự kiện popstate xảy ra (nút quay lại)
  //   };
  
  //   window.addEventListener("popstate", handlePopstate);
  
  //   return () => {
  //     window.removeEventListener("popstate", handlePopstate);
  //   };
  // }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được render
  // }, [location.pathname]);

  
  const [showModal, setShowModal] = useState(false);
  const [showGif, setShowGif] = useState(true);


  // useEffect(() => {
  //   // Hiển thị GIF trong 5 giây, sau đó hiển thị modal
  //   const timeout = setTimeout(() => {
  //     setShowGif(false);
  //     setShowModal(true);
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, []);


//   useEffect(() => {
//     // Hiển thị modal khi trang được làm mới hoặc thay đổi
//     setShowModal(true);
  
//     return () => {
//       // Ẩn modal khi component bị unmount
//       setShowModal(false);
//     };
//   }, [location.pathname]);

//   // ẩn thanh cuộn css
//   const scrollbarStyle = `
//   ::-webkit-scrollbar {
//     display: none;
//   }
// `;



  return (
    <>
    <div className="page-wrapper"> 
         <Header />
         <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
          {/* <Routes>  */}
            {/* <Route path="/" element={<Index />} /> */}
            {/* <Route path="/index2" element={<Index2 />} />
            <Route path="/index3" element={<Index3 />} />
            <Route path="/index4" element={<Index4 />} />
            <Route path="/index5" element={<Index5 />} />
            <Route path="/index6" element={<Index6 />} />
            <Route path="/shop-grid-left-sidebar" element={<PGLS />} />
            <Route path="/shop-grid-right-sidebar" element={<PGRS />} />
            <Route path="/shop-grid-no-sidebar" element={<PGNS />} />
            <Route path="/shop-grid-fullwidth" element={<PGFW />} />
            <Route path="/shop-list-left-sidebar" element={<PLLS />} />
            <Route path="/shop-list-right-sidebar" element={<PLRS />} />
            <Route path="/shop-list-no-sidebar" element={<PLNS />} />
            <Route path="/shop-list-fullwidth" element={<PLFW />} />
            <Route path="/product-left-image" element={<PLI />} />
            <Route path="/product-right-image" element={<PRI />} />
            <Route path="/product-cart" element={<ProductCart />} />
            <Route path="/product-checkout" element={<CheckOut />} />
            <Route path="/order-complete" element={<OrderComplete />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-2" element={<Login2 />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms-and-conditions" element={<TAndC />} />
            <Route path="/blog-card" element={<BlogCards />} />
            <Route path="/blog-listing" element={<BlogsList1 />} />
            <Route path="/blog-listing-2" element={<BlogsList2 />} />
            <Route path="/blog-single" element={<BlogSingle />} />
            <Route path="/contact-us" element={<ContatctUs />} /> */}
          {/* </Routes> */}
        <Footer />

        {/* <BackToTop /> */}
      </div>

    </>
  )
}

export default App
