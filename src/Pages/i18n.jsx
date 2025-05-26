import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Ekocart store",
      freeShipping: "Free global shipping",
      selectSize: "How to select Size",
      aboutUs: "About Us",
      search_placeholder: "Enter your keyword",
      call_us: "Call us",
      
    },
  },
  vn: {
    translation: {
      welcome: "Chào mừng đến với cửa hàng Ekocart",
      freeShipping: "Miễn phí vận chuyển toàn cầu",
      selectSize: "Cách chọn Size",
      aboutUs: "Giới thiệu",
      search_placeholder: "Nhập từ khóa của bạn",
      call_us: "Nhập từ khóa của bạn",
    },
  },
};

i18n
  .use(LanguageDetector) // optional: auto detect browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "vn",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
