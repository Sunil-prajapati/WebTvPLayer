import React from "react";
import PropTypes from "prop-types";
import "../../styles/component/customFileInput.scss";
const CustomFileInput = ({ selectedFile, handleFileChange, className }) => {
  return (
    <div className={`${className} "custom-file-input-container"`}>
      <label className="custom-file-label">
        {selectedFile ? selectedFile.name : "Browse File"}
        <input type="file" name={selectedFile ? selectedFile :'file-input'} onChange={handleFileChange} />
      </label>
    </div>
  );
};
CustomFileInput.propTypes = {
  selectedFile: PropTypes.any,
  handleFileChange: PropTypes.func,
  className: PropTypes.string,
};

export default CustomFileInput;
