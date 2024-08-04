import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "../../constant/enum";

export default function Close({fill}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5703 34.3047C8.28905 34.3047 0.765625 26.7812 0.765625 17.5C0.765625 8.21874 8.28905 0.695312 17.5703 0.695312C26.8515 0.695312 34.375 8.21874 34.375 17.5C34.375 26.7109 26.8515 34.3047 17.5703 34.3047ZM17.5703 2.45312C9.34374 2.45312 2.59373 9.20311 2.59373 17.4297C2.59373 25.6562 9.34374 32.4062 17.5703 32.4062C25.7969 32.4062 32.5468 25.6562 32.5468 17.4297C32.5468 9.20311 25.7969 2.45312 17.5703 2.45312Z"
        fill={fill}
      />
      <path
        d="M10.2578 26.0781L8.92188 24.7422L24.8125 8.85156L26.1484 10.1875L10.2578 26.0781Z"
        fill={fill}
      />
      <path
        d="M24.8125 26.0781L8.92188 10.1875L10.2578 8.85156L26.1484 24.7422L24.8125 26.0781Z"
        fill={fill}
      />
    </svg>
  );
}

Close.propTypes = {
  fill: PropTypes.string,
};

Close.defaultProps = {
  fill: COLORS.RED,
};
