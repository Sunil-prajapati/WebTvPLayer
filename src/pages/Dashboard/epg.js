import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LabelText from "../../components/typography/labelText";
import "../../styles/component/dropDown.scss";
import Logo from "../../assets/logo/logo.svg";
import * as dashboardActions from "../../action/dashboardAction";

const EPG = () => {
  const navigate = useNavigate();
  const timeShiftValues = 12;
  const timeShift = Array.from({ length: timeShiftValues });
  const dispatch = useDispatch()
  const epgShiftSavedValue = useSelector(
    (state) => state.dashboardReducer?.epgShift
  );
  const handleChange = (e) => {
    dispatch(dashboardActions.addEpgShift(e.target.value))
  };
  return (
    <>
    <div className="flex flex-row items-center lg:py-8 py-1 md:px-8 px-2">
        <img
          src={Logo}
          alt="logo"
          className="lg:w-32 w-28 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <LabelText
          text="EPG Time shift"
          className="pl-4 border-l border-white ml-4"
          textColor="text-white"
          fontSize="text-lg"
        />
      </div>
    <div className="flex flex-col items-center">
      <LabelText
        text="EPG TIMESHIFT"
        textColor="text-white"
        fontSize="text-3xl"
        fontWeight="font-bold"
      />
      <div className="flex flex-row justify-center mt-8">
        <select onChange={handleChange} defaultValue={epgShiftSavedValue ? epgShiftSavedValue : "+1"}>
          {timeShift?.map((option, index) => {
            return (
              <option key={index} value={index+1}>
                {index + 1}
              </option>
            );
          })}
        </select>
      </div>
    </div>
    </>

  );
};
export default EPG;
