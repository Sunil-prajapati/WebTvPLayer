import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "../../constant/enum";

const EyeClose = ({ fill }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 47 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5564 28.014L16.6021 24.3159C15.0809 23.2143 13.8919 21.8242 13.0352 20.1457C12.1784 18.4671 11.75 16.6924 11.75 14.8214C11.75 12.7057 12.2833 10.7387 13.3499 8.92022C9.3458 10.966 6.01488 14.0521 3.35714 18.1786C6.27716 22.6898 10.0102 25.9682 14.5564 28.014ZM24.7589 8.10716C24.7589 7.75746 24.6365 7.46021 24.3917 7.21542C24.1469 6.97063 23.8497 6.84823 23.5 6.84823C21.3144 6.84823 19.4391 7.63069 17.8742 9.19561C16.3092 10.7605 15.5268 12.6358 15.5268 14.8214C15.5268 15.1711 15.6492 15.4684 15.894 15.7132C16.1388 15.958 16.436 16.0804 16.7857 16.0804C17.1354 16.0804 17.4327 15.958 17.6775 15.7132C17.9222 15.4684 18.0446 15.1711 18.0446 14.8214C18.0446 13.3177 18.5779 12.0326 19.6445 10.966C20.7111 9.89939 21.9963 9.36609 23.5 9.36609C23.8497 9.36609 24.1469 9.24369 24.3917 8.9989C24.6365 8.75411 24.7589 8.45686 24.7589 8.10716ZM34.2796 3.09767C34.2796 3.22007 34.2708 3.29875 34.2533 3.33372C32.4174 6.62093 29.6635 11.5692 25.9916 18.1786C22.3198 24.788 19.5571 29.745 17.7037 33.0497L16.4185 35.3839C16.2437 35.6637 15.9989 35.8036 15.6842 35.8036C15.4743 35.8036 14.3028 35.1916 12.1696 33.9677C11.8899 33.7928 11.75 33.548 11.75 33.2333C11.75 33.0235 12.1347 32.2629 12.904 30.9515C10.4036 29.8149 8.09998 28.3025 5.99302 26.4141C3.88607 24.5257 2.06324 22.3838 0.524554 19.9883C0.174851 19.4463 0 18.843 0 18.1786C0 17.5142 0.174851 16.9109 0.524554 16.3689C3.19978 12.2599 6.52195 9.01639 10.4911 6.63841C14.4602 4.26043 18.7965 3.07145 23.5 3.07145C25.0562 3.07145 26.6298 3.22007 28.221 3.51732L29.6373 0.973232C29.8121 0.69347 30.0569 0.553589 30.3717 0.553589C30.4591 0.553589 30.6164 0.606044 30.8438 0.710955C31.0711 0.815866 31.3421 0.951375 31.6568 1.11748C31.9715 1.28359 32.26 1.44533 32.5223 1.6027C32.7846 1.76006 33.06 1.9218 33.3485 2.08791C33.637 2.25402 33.8075 2.35456 33.8599 2.38953C34.1397 2.56438 34.2796 2.80043 34.2796 3.09767ZM35.25 14.8214C35.25 17.2519 34.5593 19.4681 33.178 21.4702C31.7967 23.4722 29.9695 24.9104 27.6964 25.7846L35.0402 12.6183C35.1801 13.4052 35.25 14.1395 35.25 14.8214ZM47 18.1786C47 18.7906 46.8251 19.3938 46.4754 19.9883C45.7935 21.1073 44.8406 22.375 43.6166 23.7913C40.9939 26.7988 37.9558 29.133 34.5025 30.7941C31.0492 32.4552 27.3817 33.2857 23.5 33.2857L25.4408 29.8237C29.1477 29.5089 32.5791 28.3112 35.7352 26.2305C38.8913 24.1498 41.5272 21.4658 43.6429 18.1786C41.6321 15.0488 39.1667 12.4784 36.2467 10.4677L37.899 7.53015C39.5601 8.6492 41.1556 9.98681 42.6855 11.543C44.2155 13.0992 45.4788 14.7078 46.4754 16.3689C46.8251 16.9634 47 17.5666 47 18.1786Z"
        fill={fill}
      />
    </svg>
  );
};
export default EyeClose;

EyeClose.propTypes = {
  fill: PropTypes.string,
};

EyeClose.defaultProps = {
  fill: COLORS.WHITE,
};