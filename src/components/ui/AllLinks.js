import React from "react";
import GooglePlay from "../../assets/images/google-play.png";
import AppStore from "../../assets/images/app-store.png";
import WebBrowser from "../../assets/images/webss.png";
import LabelText from "../typography/labelText";
import '../../styles/component/allLinks.scss';

export default function AllLinks({className}) {
  return (
    <div className={`flex flex-col items-center gap gap-4 md:mt-4 mt-0 ${className}`}>
      <div className="flex flex-row gap gap-16">
        <a
          href="https://play.google.com/store/apps/details?id=com.iptvBlinkPlayer"
          target="_blank"
          rel="noreferrer"
        >
          <img src={GooglePlay} alt="google play" width="274" height="78" className="link-btn" />
        </a>
        <a
          href=" https://apps.apple.com/us/app/blink-player-pro/id1635779666"
          target="_blank"
          rel="noreferrer"
        >
          <img src={AppStore} alt="app play" width="274" height="78" className="link-btn"/>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.blinkplayerlite"
          target="_blank"
          rel="noreferrer"
        >
          <img src={WebBrowser} alt="web browser" width="274" height="78" className="link-btn"/>
        </a>
      </div>
      <div className="flex flex-row gap gap-3 items-end">
        <LabelText
          text={<div>Developed by <span class='blink-team'>Blink Team </span></div>}
          textColor="text-white"
          fontSize="lg:text-2xl text-base"
          fontWeight="text-bold"
        />

        <LabelText
          text="Visit our officail website for more info: "
          textColor="text-white"
          fontSize="lg:text-xl text-sm"
          fontWeight="text-medium"
        />
        <a href="https://iptvblinkplayer.com/" target="_blank" rel="noreferrer">
          <LabelText
            text="iptvblinkplayer.com"
            textColor="text-green-300"
            fontWeight="text-regular"
            fontSize="lg:text-xl text-sm"
          />
        </a>
      </div>
    </div>
  );
}
