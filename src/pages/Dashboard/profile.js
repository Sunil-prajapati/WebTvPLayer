import React from "react";
import { useSelector } from "react-redux";
import DateTime from "../../components/ui/DateTime";
import HorizontalAdd from "../../components/adds/HorizontalAdd";
import Logo from "../../assets/logo/logo.svg";
import "../../styles/pages/profile.scss";
import LabelText from "../../components/typography/labelText";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const profileDetails = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  return (
    <>
      <div className="flex flex-row lg:py-8 py-1 md:px-8 px-2">
        <img
          src={Logo}
          alt="logo"
          className="lg:w-48 w-28 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <DateTime />
        <div className="lg:ml-4">
          <HorizontalAdd />
        </div>
      </div>
      <div className="bg-grey-100 rounded-lg flex justify-center md:mx-8 mx-2">
        <div className="p-6 w-full flex flex-col items-center">
          <LabelText
            text="Subscription Info"
            textColor="text-white"
            fontWeight="font-bold"
            fontSize="text-2xl"
          />
          <div className="mt-6 flex flex-col gap-2 w-3/5">
            <div className="flex flex-row justify-between">
              <LabelText
                text="Username:"
                textColor="text-white"
                fontSize="text-base"
              />
              <LabelText
                text={profileDetails?.username}
                textColor="text-white"
                fontSize="text-base"
              />
            </div>
            <div className="flex flex-row justify-between ">
              <LabelText
                text="Account Status:"
                textColor="text-white"
                fontSize="text-base"
              />
              <LabelText
                text={profileDetails?.status}
                textColor="text-white"
                fontSize="text-base"
              />
            </div>
            <div className="flex flex-row justify-between ">
              <LabelText
                text="Expire Date:"
                textColor="text-white"
                fontSize="text-base"
              />
              <LabelText
                text={moment
                  .unix(profileDetails?.exp_date)
                  .format("MM/DD/YYYY")}
                textColor="text-white"
                fontSize="text-base"
              />
            </div>
            <div className="flex flex-row justify-between ">
              <LabelText
                text="Is Trial:"
                textColor="text-white"
                fontSize="text-base"
              />
              <LabelText
                text={profileDetails?.is_trial}
                textColor="text-white"
                fontSize="text-base"
              />
            </div>
            <div className="flex flex-row justify-between ">
              <LabelText
                text="Active Connections:"
                textColor="text-white"
                fontSize="text-base"
              />
              <LabelText
                text={profileDetails?.max_connections}
                textColor="text-white"
                fontSize="text-base"
              />
            </div>
            <div className="flex flex-row justify-between ">
              <LabelText
                text="Created At:"
                textColor="text-white"
                fontSize="text-base"
              />
              <LabelText
                text={moment
                  .unix(profileDetails?.created_at)
                  .format("MM/DD/YYYY")}
                textColor="text-white"
                fontSize="text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
