import React from "react";
import LabelText from "../typography/labelText";
import PropTypes from "prop-types";
import { stringTruncate } from "../../constant/helper";

const CategoriesList = ({ data, onClick, bgColor }) => {
  return (
    <div
      className={`lg:w-[400px] w-[250px] lg:h-[64.816px] h-auto flex-shrink-0 rounded-[1.178px] border border-rgbaColor-100 cursor-pointer ${bgColor}`}
      onClick={onClick}
    >
      <div className="flex flex-row justify-between lg:p-4 p-3">
        <LabelText
          text={stringTruncate(
            data?.[0]?.group_title || data?.category_name,
            30
          )}
          textColor="text-white"
          fontWeight="font-normal"
          fontSize="lg:text-[21.122px] text-[13px]"
        />
        <LabelText
          text={data?.length || data?.category_id}
          textColor="text-white"
          fontWeight="font-normal"
          fontSize="lg:text-[20.623px] text-[12px]"
        />
      </div>
    </div>
  );
};

export default CategoriesList;

CategoriesList.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
};
