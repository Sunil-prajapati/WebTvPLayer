import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withHttp } from "../../../constant/helper";
import * as liveTvAction from "../../../action/livetvAction";
import { API_STATUS } from "../../../constant/enum";

const useLiveCategoryChannels = () => {
  const { username, password } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  const { url, port } = useSelector(
    (state) => state.loginReducer?.userDetails?.server_info
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [allChannels, setAllChannels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getChannelsOfCategories = async (categoryId) => {
    setLoading(true);
    const liveChannelsUrl = `${withHttp(
      url
    )}:${port}/player_api.php?username=${username}&password=${password}&action=get_live_streams&category_id=${categoryId}`;
    try {
      const liveTvChannelsResponse = await dispatch(
        liveTvAction.getLiveTvChannels(liveChannelsUrl)
      );
      if (liveTvChannelsResponse.status === API_STATUS.STATUS_200) {
        setAllChannels(liveTvChannelsResponse?.data);
        setSelectedCategory(categoryId);
      } else {
        console.error("Failed to fetch live channels:", liveTvChannelsResponse);
      }
    } catch (error) {
      console.error("Error fetching live channels:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    allChannels,
    selectedCategory,
    setAllChannels,
    getChannelsOfCategories,
    setSelectedCategory,
  };
};

export default useLiveCategoryChannels;
