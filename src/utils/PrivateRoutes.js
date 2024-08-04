import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLocalStorageValue } from "../constant/helper";
import { constant } from "../constant/enum";

const PrivateRoutes = () => {
  const { auth } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info || {}
  );

  return auth || getLocalStorageValue(constant?.M3U_USERNAME) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} />
  );
};
export default PrivateRoutes;
