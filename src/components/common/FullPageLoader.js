import React from "react";
import Logo from "../../assets/logo/logo.svg";
import "../../styles/component/fullPageLoader.scss";

export default function FullPageLoader() {
  return (
    <div className="loader-container flex items-center justify-center">
      <div className="loader">
        <svg
          viewBox="0 0 120 120"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="load three"
            cx="60"
            cy="60"
            r="40"
            strokeLinecap="round"
          />
          <circle
            className="load two"
            cx="60"
            cy="60"
            r="40"
            strokeLinecap="round"
          />
          <circle
            className="load one"
            cx="60"
            cy="60"
            r="40"
            strokeLinecap="round"
          />
          <g></g>
        </svg>
        <img src={Logo} alt="iptv blinkPlayer logo" className="absolute w-14" />
      </div>
    </div>
  );
}
