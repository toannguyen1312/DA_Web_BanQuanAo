import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";

export default function Header() {
  return (
    <>
      <header className="site-header">
        <HeaderTop />
        <HeaderMiddle
          options={[
            { value: "all", label: "All Categories" },
            { value: "men", label: "Men" },
            { value: "women", label: "Women" },
            { value: "kids", label: "Kids" },
          ]}
        />
        {/* <HeaderNavBar /> */}
      </header>
    </>
  );
}
