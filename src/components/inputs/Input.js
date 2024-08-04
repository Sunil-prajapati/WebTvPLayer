import React from "react";
import "../../styles/global.scss";
import LabelText from "../typography/labelText";
import PropTypes from "prop-types";

export default function Input({
  value,
  label,
  name,
  placeholder,
  type,
  onChange,
  className,
  labelBgColor,
  labelContainerCustomClass,
  paddingRight,
  isLabelRequired,
  inputContainerCustomClass,
}) {
  return (
    <div className={`w-full ${className}`}>
      <div
        className={`flex flex-row items-center lg:pl-10 pl-1 ${paddingRight}`}
      >
        {isLabelRequired && (
          <div
            className={` ${labelBgColor} ${labelContainerCustomClass} lg:w-2/6 w-1/5  flex items-center justify-center`}
          >
            <LabelText text={label} textAlign="text-center" />
          </div>
        )}
        <div className={inputContainerCustomClass}>
          <input
            type={type}
            value={value}
            name={name}
            className="input-field pl-3"
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

Input.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.string,
  textColor: PropTypes.string,
  fontWeight: PropTypes.string,
  labelBgColor: PropTypes.string,
  labelContainerCustomClass: PropTypes.string,
  paddingRight: PropTypes.string,
  isLabelRequired: PropTypes.bool,
  inputContainerCustomClass: PropTypes.string,
};

Input.defaultProps = {
  text: "",
  fontSize: "text-3xl",
  textColor: "text-black",
  fontWeight: "font-medium",
  labelBgColor: "bg-antique-100",
  paddingRight: "lg:pr-20 pr-auto",
  isLabelRequired: true,
  inputContainerCustomClass: "lg:w-4/6 w-full md:ml-3 mx-1",
};
