import React from "react";
import LabelText from "../typography/labelText";
import ScreenOrientation from '../../assets/images/screen-rotation.png'
export const OrientationBanner = () => {
  return (
    <div className="flex flex-col justify-center gap-4 items-center app-container">
      <LabelText
        text="To Start"
        textColor="text-white"
        fontSize="text-3xl"
        fontWeight="font-bold"
      />
      <LabelText
        text="UNLOCK YOUR PHONE ORIENTATION"
        fontSize="text-3xl"
        textColor="text-white"
        fontWeight="font-bold"
      />
      <img src={ScreenOrientation} alt='screen orientation' width='100' height='100'/>
    </div>
  );
};
