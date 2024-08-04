import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "../../constant/enum";

const Rating = ({ fill }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.4696 4.85752L31.8883 17.8778C31.9181 17.9383 31.9625 17.9903 32.0175 18.0293C32.0725 18.0683 32.1363 18.0931 32.2031 18.1013L46.5539 20.2341C46.6312 20.2447 46.7039 20.2769 46.7638 20.3268C46.8237 20.3768 46.8684 20.4425 46.8927 20.5166C46.9171 20.5907 46.9201 20.6702 46.9015 20.7459C46.8829 20.8216 46.8434 20.8906 46.7875 20.945L36.3977 31.1013C36.3555 31.1399 36.3219 31.187 36.2991 31.2395C36.2764 31.292 36.265 31.3487 36.2656 31.406L38.7235 45.706C38.7355 45.7817 38.7263 45.8593 38.697 45.9302C38.6677 46.001 38.6194 46.0624 38.5574 46.1076C38.4955 46.1528 38.4222 46.18 38.3458 46.1861C38.2693 46.1923 38.1927 46.1773 38.1242 46.1427L25.2867 39.3685C25.2269 39.3381 25.1608 39.3223 25.0938 39.3223C25.0267 39.3223 24.9606 39.3381 24.9008 39.3685L12.0531 46.1224C11.9847 46.157 11.9081 46.172 11.8316 46.1658C11.7552 46.1596 11.6819 46.1325 11.62 46.0873C11.558 46.0421 11.5097 45.9807 11.4804 45.9099C11.4511 45.839 11.4419 45.7614 11.4539 45.6856L13.9219 31.406C13.9334 31.3397 13.9283 31.2716 13.9071 31.2078C13.8858 31.144 13.849 31.0864 13.8 31.0403L3.41018 20.8841C3.35428 20.8297 3.31479 20.7607 3.29619 20.685C3.27759 20.6092 3.28064 20.5298 3.30499 20.4557C3.32933 20.3816 3.374 20.3158 3.43389 20.2659C3.49379 20.2159 3.56651 20.1838 3.64377 20.1731L17.9844 18.1013C18.0513 18.0931 18.1151 18.0683 18.1701 18.0293C18.225 17.9903 18.2694 17.9383 18.2992 17.8778L24.718 4.85752C24.7545 4.7896 24.8087 4.73284 24.8749 4.69328C24.941 4.65371 25.0167 4.63281 25.0938 4.63281C25.1709 4.63281 25.2465 4.65371 25.3127 4.69328C25.3789 4.73284 25.4331 4.7896 25.4696 4.85752Z"
        fill={fill}
      />
      <path
        d="M38.2155 46.4987C38.0488 46.4979 37.8849 46.456 37.7382 46.3768L25.0936 39.7245L12.4491 46.3768C12.2817 46.4644 12.0933 46.5035 11.9049 46.4899C11.7165 46.4762 11.5356 46.4103 11.3827 46.2995C11.2297 46.1887 11.1106 46.0375 11.0389 45.8627C10.9671 45.688 10.9455 45.4967 10.9764 45.3104L13.3835 31.2237L3.15613 21.2503C3.02558 21.12 2.93297 20.9566 2.88823 20.7777C2.8435 20.5988 2.84834 20.411 2.90222 20.2346C2.96075 20.0447 3.07374 19.876 3.2272 19.7497C3.38065 19.6233 3.56782 19.5447 3.7655 19.5237L17.903 17.4925L24.1796 4.65496C24.2627 4.48324 24.3926 4.33843 24.5542 4.2371C24.7159 4.13577 24.9028 4.08203 25.0936 4.08203C25.2844 4.08203 25.4714 4.13577 25.633 4.2371C25.7947 4.33843 25.9245 4.48324 26.0077 4.65496L32.3249 17.462L46.4218 19.5237C46.6097 19.5504 46.7864 19.6293 46.9319 19.7514C47.0773 19.8734 47.1855 20.0338 47.2444 20.2143C47.2983 20.3907 47.3031 20.5784 47.2584 20.7574C47.2137 20.9363 47.1211 21.0997 46.9905 21.23L36.8038 31.2237L39.2108 45.3104C39.2482 45.4999 39.2307 45.696 39.1606 45.8759C39.0904 46.0558 38.9705 46.2119 38.8147 46.326C38.638 46.445 38.4284 46.5054 38.2155 46.4987ZM25.0936 37.5612C25.2603 37.562 25.4243 37.6039 25.571 37.6831L36.8647 43.594L34.7014 31.0409C34.6731 30.8776 34.6851 30.7099 34.7364 30.5524C34.7878 30.3948 34.8769 30.2522 34.996 30.137L44.1366 21.23L31.5022 19.4018C31.3395 19.3774 31.1852 19.3138 31.0525 19.2165C30.9198 19.1192 30.8127 18.9911 30.7405 18.8432L25.0936 7.39714L19.4468 18.8432C19.3745 18.9911 19.2675 19.1192 19.1348 19.2165C19.0021 19.3138 18.8478 19.3774 18.685 19.4018L6.05066 21.2503L15.1913 30.1573C15.3104 30.2725 15.3995 30.4151 15.4508 30.5727C15.5022 30.7302 15.5142 30.8979 15.4858 31.0612L13.3225 43.594L24.6163 37.6526C24.7657 37.584 24.9295 37.5526 25.0936 37.5612Z"
        fill={fill}
      />
    </svg>
  );
};
export default Rating;
Rating.propTypes = {
  fill: PropTypes.string,
};

Rating.defaultProps = {
  fill: COLORS.GRAY,
};