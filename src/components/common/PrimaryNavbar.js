import React from "react";
import DateTime from "../ui/DateTime";
import HorizontalAdd from "../adds/HorizontalAdd";
import Logo from "../../assets/logo/logo.svg";

const PrimaryNavbar = () => {
  return (
    <div className="flex flex-row lg:py-8 py-1 md:px-8 px-2">
      <img src={Logo} alt="logo" className="lg:w-40 w-28" />
      <DateTime />
      <div className="lg:ml-4">
        <HorizontalAdd />
      </div>
    </div>
  );
};

export default PrimaryNavbar
