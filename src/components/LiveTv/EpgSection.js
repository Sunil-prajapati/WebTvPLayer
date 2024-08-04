import React, { useState, useEffect } from "react";
import LabelText from "../typography/labelText";
import PropTypes from "prop-types";
import { convertTimeStamp, withHttp } from "../../constant/helper";
import * as livetvAction from "../../action/livetvAction";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { Base64 } from "js-base64";
import { API_STATUS } from "../../constant/enum";

function EpgSection({ getEpg, categoryName, streamId }) {
  const { username, password } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  const { url, port } = useSelector(
    (state) => state.loginReducer?.userDetails?.server_info
  );
  const epgShiftSavedValue = useSelector(
    (state) => state.dashboardReducer?.epgShift
  );

  const [allEpgs, setAllEpgs] = useState([]);
  const fetchEpg = async (streamId) => {
    try {
      const epgUrl = `${withHttp(
        url
      )}:${port}/player_api.php?username=${username}&password=${password}&action=get_simple_data_table&stream_id=${streamId}`;
      const epgResponse = await getEpg(epgUrl);
      if (epgResponse?.status === API_STATUS.STATUS_200) {
        setAllEpgs(epgResponse?.data?.epg_listings);
      }
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    fetchEpg(streamId);
  }, [streamId]);
  return (
    <div className="w-full h-[288.805px] border border-rgbaColor-100 flex justify-center items-center mt-6 overflow-scroll">
      {allEpgs?.length > 1 ? (
        <div className="flex flex-col w-full mt-1 ml-4">
          {allEpgs
            ?.slice(0, epgShiftSavedValue ? epgShiftSavedValue : 5)
            ?.map((epgs, index) => {
              return (
                <>
                  <div className="flex flex-col gap gap-1 mt-4" key={index}>
                    <div className="flex flex-row gap gap-1 w-full">
                      <LabelText
                        text={`${convertTimeStamp(
                          epgs?.start_timestamp
                        )} - ${convertTimeStamp(epgs?.stop_timestamp)}`}
                        textColor="text-white"
                        fontSize="lg:text-xl text-lg"
                        className="w-6/12"
                      />
                      <LabelText
                        text={Base64.decode(epgs?.title)}
                        textColor="text-blue-100"
                        fontSize="lg:text-2xl text-sm"
                        className="md:6/12 w-full"
                      />
                    </div>
                    <LabelText
                      text={Base64.decode(epgs?.description)}
                      textColor="text-white"
                      fontSize="text-lg"
                      className="mt-1 w-full"
                    />
                  </div>
                </>
              );
            })}
        </div>
      ) : (
        <LabelText
          text={categoryName}
          textColor="text-white"
          fontSize="lg:text-3xl text-sm"
        />
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEpg: (testLine) => dispatch(livetvAction.getLiveEpgRequest(testLine)),
  };
};

export default connect(null, mapDispatchToProps)(EpgSection);

EpgSection.propTypes = {
  streamId: PropTypes.number,
  categoryName: PropTypes.string,
  getEpg: PropTypes.any,
};

EpgSection.defaultProps = {
  categoryName: "Category name",
};
