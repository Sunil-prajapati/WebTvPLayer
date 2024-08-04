import React from "react";
import SearchIcon from "../../assets/svg/cat-search.svg";
import PropTypes from "prop-types";

const CategorySearchbar = ({ onChange, placeholder }) => {
  return (
    <div className="border border-rgbaColor-100 rounded-[1.178px] bg-rgbaColor-100">
      <div className="flex flex-row gap-4 lg:p-4 p-3 items-center">
        <img
          className="lg:w-10 max-w-6 lg:h-10 max-h-6"
          src={SearchIcon}
          alt="search icon"
        />
        <input
          type="search"
          name="categorySearch"
          className="h-[40px] w-[100%] px-2 bg-rgba-200 search-input-field"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CategorySearchbar;

CategorySearchbar.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
CategorySearchbar.defaultProps = {
  placeholder: "Search",
};
