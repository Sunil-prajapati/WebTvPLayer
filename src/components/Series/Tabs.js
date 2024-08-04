import React from "react";
import LabelText from "../typography/labelText";
import PropTypes from "prop-types";

const Tabs = ({ data, onClick, activeSeason }) => {
  return (
    <div
      className={`border ${
        activeSeason === data?.season_number
          ? "border-white"
          : "border-gray-500"
      }  lg:px-4 px-3 lg:py-2 py-1 rounded-lg w-fit cursor-pointer`}
      onClick={onClick}
    >
      <LabelText
        text={`Season ${data?.season_number}`}
        textColor={`${
          activeSeason === data?.season_number ? "text-white" : "text-gray-500"
        }`}
        fontSize="text-lg"
      />
    </div>
  );
};

export default Tabs;

Tabs.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  activeSeason: PropTypes.number,
};
