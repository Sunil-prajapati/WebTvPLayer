import React from "react";
import LabelText from "../typography/labelText";
import { addDefaultSrc } from "../../constant/helper";

const NewMoviesSeriesCard = ({ onClick, data }) => {
  return (
    <div
      className="rounded-md flex justify-center relative cursor-pointer w-[150px] h-[190px]"
      onClick={() => onClick(data)}
    >
      <img
        onError={addDefaultSrc}
        src={
          data?.tvg_logo ||
          data?.stream_icon ||
          data?.movie_image ||
          data?.cover
        }
        alt="movie-series"
        className="rounded-md w-[100%] h-auto"
      />
      <LabelText
        text={data?.tvg_name || data?.name}
        textColor="text-white"
        fontSize="lg:text-base text-[12px]"
        className="absolute bottom-0 bg-slate-800 filter--tw-grayscale w-full"
      />
    </div>
  );
};

export default NewMoviesSeriesCard;
