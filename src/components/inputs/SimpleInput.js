import React from "react";
import PropTypes from "prop-types";
import '../../styles/component/simpleInput.scss'

export default function SimpleInput({
  type,
  value,
  name,
  placeholder,
  onChange,
  className
}) {
  return (
    <input
      type={type}
      value={value}
      name={name}
      className={`simple-input ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

SimpleInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
};
SimpleInput.defaultProps = {
  type: "text",
};
