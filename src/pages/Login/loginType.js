import React from "react";
import Logo from "../../assets/logo/logo.svg";
import "../../styles/pages/login-type.scss";
import Xtream from "../../assets/svg/Xtream";
import LabelText from "../../components/typography/labelText";
import M3u from "../../assets/svg/M3u";
import AllLinks from "../../components/ui/AllLinks";
import { useNavigate } from "react-router-dom";

const LoginType = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mx-6 justify-between min-h-[100dvh]">
      <img src={Logo} alt="blink player logo" className="lg:w-40 w-28 mt-8" />
      <div className="login-type-container lg:mt-6 mt-3">
        <div className="flex flex-auto md:gap-8 gap-4 w-full">
          <div
            className="option-container w-full"
            onClick={() => navigate("/xtream-code")}
          >
            <div className="my-2 flex flex-col gap-2 items-center justify-center">
              <div className="file-icon">
                <Xtream />
              </div>
              <LabelText
                text="LOGIN WITH XTREAM CODES API"
                textColor="text-white"
                fontWeight="font-bold"
              />
            </div>
          </div>
          <div
            className="option-container w-full "
            onClick={() => navigate("/m3u-login")}
          >
            <div className="my-2 flex flex-col gap-2 items-center justify-center">
              <div className="file-icon">
                <M3u />
              </div>
              <LabelText
                text="LOGIN WITH M3U PORTAL"
                textColor="text-white"
                fontWeight="font-bold"
              />
            </div>
          </div>
        </div>
        <div className="lg:mt-12 my-4">
          <AllLinks />
        </div>
      </div>
    </div>
  );
};

export default LoginType;
