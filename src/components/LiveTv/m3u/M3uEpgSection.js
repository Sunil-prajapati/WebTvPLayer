import React, { useEffect, useState } from "react";
import LabelText from "../../typography/labelText";
import axios from "axios";
import { API_STATUS } from "../../../constant/enum";

const M3uEpgSection = ({ epgUrl }) => {
  const [allEpgs, setAllEpgs] = useState();
  const fetchEpg = async (url) => {
    try {
      const epgResponse = await axios.get(url);
      if (epgResponse?.status === API_STATUS?.STATUS_200) {
        setAllEpgs(epgResponse?.data);
      }
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    fetchEpg(epgUrl);
  }, [epgUrl]);

  return (
    <div className="w-full h-[288.805px] border border-rgbaColor-100 flex justify-center items-center mt-6">
      <LabelText
        text="Tv guide info"
        textColor="text-grey-100"
        fontSize="text-base"
      />
    </div>
  );
};

export default M3uEpgSection;
