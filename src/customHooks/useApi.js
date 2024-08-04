import { useEffect, useState } from "react";
import Api from "../utils/Api";

const useApi = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    try {
      const apiResponse = await Api.get(url);
      setData(apiResponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error)
    }
  };

  useEffect(() => {
    fetchApi();
  }, [url]);

  return { loading, data ,error};
};

export default useApi;
