import React from "react";
import "../../styles/component/moviesSeriesCard.scss";
import Heart from "../../assets/svg/heart";
import LabelText from "../typography/labelText";
import { COLORS } from "../../constant/enum";
import { addDefaultSrc } from "../../constant/helper";

export default function MovieSeriesCard({ data, onClick, heartClicked,favouriteClickedStreamId }) {
  
  return (
    <div
      className="movies-series-card-container flex flex-row cursor-pointer"
      onClick={onClick}
    >
      <div className="movies-image-container">
        <img
          src={data?.stream_icon ? data?.stream_icon : data?.cover}
          className="movies-image"
          alt="stream poster"
          onError={addDefaultSrc}
        />
      </div>
      <div className="flex flex-col my-2 items-center">
        <div className="heart-icon" onClick={(event) => heartClicked(event)}>
          <Heart fill={
            data?.isFavourite ||
            favouriteClickedStreamId?.includes(data?.stream_id)
              ? COLORS.RED
              : COLORS.WHITE
          }/>
        </div>
        <div className="movies-name-container flex justify-center mt-1">
          <LabelText
            text={data?.name}
            fontSize="lg:text-xl text-sm"
            textColor="text-white"
            fontWeight="font-normal"
            className="break-all"
          />
        </div>
        <LabelText
          text={data?.num}
          fontSize="lg:text-2xl"
          textColor="text-white"
          fontWeight="font-normal"
        />
      </div>
    </div>
  );
}
