import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";
import HeaderNavBar from "./HeaderNavBar";

export default function Header() {
  return (
    <>
      <header className="site-header">
        <HeaderTop />
        <HeaderMiddle
          options={[
            { value: "", label: "Tất Cả" },
            { value: "2", label: "Áo Sơ Mi" },
            { value: "3", label: "Áo Khoác" },
            { value: "4", label: "Quần Jean" },
             { value: "5", label: "Quần Short" },
          ]}
        />
        <HeaderNavBar />
      </header>
    </>
  );
}
