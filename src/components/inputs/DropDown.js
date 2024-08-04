import React from "react";
import PropTypes from "prop-types";
import "../../styles/component/dropDown.scss";

export default function DropDown({ handleChange, options }) {
  return (
    <div>
      <select onChange={handleChange} defaultValue={options[0]?.season_number}>
        {options?.map((option, index) => {
          return (
            <option key={index} value={option?.season_number}>
              Season {option?.season_number}
            </option>
          );
        })}
      </select>
    </div>
  );
}

DropDown.propTypes = {
  handleChange: PropTypes.func,
  options: PropTypes.array,
};
