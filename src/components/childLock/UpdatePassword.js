import React, { useState } from "react";
import "../../styles/component/updatePassword.scss";
import SimpleInput from "../inputs/SimpleInput";
import LabelText from "../typography/labelText";
import { connect, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as dashboardActions from "../../action/dashboardAction";
import { useNavigate } from "react-router-dom";
import Key from "../../assets/images/key.png";

function UpdatePassword({ updateParentalLock }) {
  const navigate = useNavigate();
  const savedOldPassword = useSelector(
    (state) => state.dashboardReducer?.parentalPassword
  );
  const [loginDetails, setLoginDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const updatePassword = async () => {
    console.log(savedOldPassword);
    if (savedOldPassword !== loginDetails?.oldPassword) {
      toast("Old Password is not correct");
    } else if (loginDetails?.newPassword !== loginDetails?.confirmPassword) {
      toast("Password does not match");
    } else {
      await updateParentalLock(loginDetails?.newPassword);
      toast("Password updated successfully!");
      navigate("/settings");
    }
  };

  return (
    <div className="update-password">
      <div className="mx-9 my-4">
        <div className="flex flex-row gap gap-4">
          <img src={Key} alt="key" width="55" height="55" loading="eager" />
          <LabelText
            text="Security"
            textColor="text-white"
            fontWeight="text-bold"
            fontSize="text-4xl"
          />
        </div>
        <div className="flex flex-col my-5 gap gap-2">
          <SimpleInput
            type="password"
            value={loginDetails?.oldPassword}
            placeholder="Old Password"
            name="oldPassword"
            className="input-field-width"
            onChange={handleChange}
          />
          <SimpleInput
            type="password"
            value={loginDetails?.newPassword}
            placeholder="New Password"
            name="newPassword"
            className="input-field-width"
            onChange={handleChange}
          />
          <SimpleInput
            type="password"
            value={loginDetails?.confirmPassword}
            placeholder="Confirm Password"
            name="confirmPassword"
            className="input-field-width"
            onChange={handleChange}
          />
        </div>
        <div
          className="my-5 flex justify-center cursor-pointer"
          onClick={updatePassword}
        >
          <div className="update-Password-btn flex justify-center items-center">
            <LabelText
              text="Update Password"
              textColor="text-white"
              fontWeight="text-bold"
              fontSize="text-3xl"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateParentalLock: (password) =>
      dispatch(dashboardActions.addLock(password)),
  };
};
export default connect(null, mapDispatchToProps)(UpdatePassword);
