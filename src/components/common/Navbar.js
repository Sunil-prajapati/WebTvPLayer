import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo/logo.svg";
import LabelText from "../typography/labelText";
import PropTypes from "prop-types";
import SearchIcon from "../../assets/svg/search";
import Options from "../../assets/svg/options";
import HorizontalAdd from "../adds/HorizontalAdd";
import "../../styles/component/navbar.scss";
import MenuDropDown from "../ui/MenuDropDown";
import Input from "../inputs/Input";
import Close from "../../assets/svg/Close";
import { COLORS } from "../../constant/enum";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({
  heading,
  data,
  searchResult,
  searchedString,
  notCategories,
}) {
  const [isOptionClicked, setOptionClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const xtreamOrM3u = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );

  const clickedOnSearch = () => {
    setIsSearchClicked(true);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = (event) => {
    event.stopPropagation();
    setIsSearchClicked(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (notCategories) {
      const filteredData = data?.filter(
        (channel) =>
          channel?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          channel?.num?.toString().includes(searchQuery.toString()) ||
          channel?.tvg_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      searchResult && searchResult(filteredData);
      searchedString && searchedString(searchQuery);
    } else {
      const filteredData = data?.filter((item) =>
        item?.category_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      searchResult && searchResult(filteredData);
      searchedString && searchedString(searchQuery);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOptionClicked(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchQuery]);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row lg:py-8 py-4 md:px-8 px-2">
        <img
          src={Logo}
          alt="logo"
          className="lg:w-48 w-28 h-16 cursor-pointer"
          onClick={() => navigate(xtreamOrM3u ? "/dashboard" : "/m3uDashboard")}
        />
        <div className="flex flex-col justify-center h-16">
          <div className="pl-4 border-l border-white ml-4">
            <LabelText
              text={heading}
              textColor="text-white"
              textAlign="text-left"
              fontSize={"lg:text-xl text-xs"}
              fontWeight="font-regular"
            />
          </div>
        </div>
        <div className="lg:ml-4">
          <HorizontalAdd />
        </div>
      </div>
      <div className="flex flex-row lg:gap-12 gap-8 py-8 md:px-8 px-2 ">
        <div
          className={`cursor-pointer ${
            !isSearchClicked && "navbar-search-icon"
          }`}
          onClick={() => clickedOnSearch()}
        >
          {isSearchClicked ? (
            <div className="flex flex-row">
              <Input
                inputContainerCustomClass="w-full"
                paddingRight="pr-0"
                isLabelRequired={false}
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
              />
              <div
                className="search-cross-icon"
                onClick={(event) => clearSearch(event)}
              >
                <Close fill={COLORS.WHITE} />
              </div>
            </div>
          ) : (
            <SearchIcon />
          )}
        </div>
        <div
          className="cursor-pointer navbar-options-icon relative"
          onClick={() => setOptionClicked(!isOptionClicked)}
          ref={dropdownRef}
        >
          <Options />
          <MenuDropDown
            className={`absolute mt-2 ${!isOptionClicked ? "hidden" : "block"}`}
          />
        </div>
      </div>
    </div>
  );
}
Navbar.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.array,
  searchResult: PropTypes.any,
  searchedString: PropTypes.any,
  notCategories: PropTypes.bool,
  searchByNum: PropTypes.bool,
};
Navbar.defaultProps = {
  heading: "LIVE TV",
  data: [],
  notCategories: false,
  searchByNum: false,
};
