import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "../../constant/enum";


const Heart = ({fill}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_227_277)">
        <path
          d="M25.4547 43.9381L8.57051 27.2079C7.85203 26.5408 7.28752 25.771 6.77432 24.9498C4.00306 20.3824 4.72154 14.532 8.57051 10.7343C10.7773 8.52757 13.7538 7.2959 16.8843 7.2959C21.811 7.2959 24.8901 10.1698 26.1731 11.812C27.4561 10.1698 30.5353 7.2959 35.462 7.2959C38.5925 7.2959 41.569 8.52757 43.7758 10.7343C47.5734 14.532 48.3432 20.3824 45.5719 24.9498C45.0587 25.771 44.4942 26.5408 43.7758 27.2079L26.8916 43.9381C26.4811 44.3487 25.8652 44.3487 25.4547 43.9381ZM16.8843 9.34868C14.267 9.34868 11.855 10.3751 10.0075 12.1713C6.87696 15.3018 6.26113 20.1258 8.51919 23.8721C8.92975 24.5393 9.44294 25.2064 10.0075 25.771L26.1731 41.7827L42.3388 25.771C42.9033 25.2064 43.4165 24.5906 43.8271 23.8721C46.0851 20.0745 45.5206 15.2504 42.3388 12.1713C40.4913 10.3751 38.028 9.34868 35.462 9.34868C31.767 9.34868 28.6878 11.3501 27.0456 14.1214C26.635 14.7886 25.6599 14.7886 25.2494 14.1214C23.6585 11.3501 20.5793 9.34868 16.8843 9.34868Z"
          fill={fill}
        />
        <path
          d="M484.97 -189.771V674.451H-430.572V-189.771H484.97ZM489.076 -193.877H-434.677V678.556H489.076V-193.877Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_227_277">
          <rect
            width="51.3196"
            height="51.3196"
            fill={fill}
            transform="translate(0.513306 0.111328)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Heart;

Heart.propTypes = {
  fill: PropTypes.string,
};
Heart.defaultProps = {
  fill: COLORS.WHITE,
};
