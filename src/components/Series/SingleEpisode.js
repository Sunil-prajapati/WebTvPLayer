import React from "react";
import LabelText from "../typography/labelText";
import { addDefaultSrc, secondsToMinutes } from "../../constant/helper";
import PropTypes from "prop-types";
import PlayButton from "../../assets/svg/play.svg";
import noPoster from "../../assets/images/noPoster.png";

const SingleEpisode = ({ data, seasonName, onClick, isGrid }) => {
  return (
    <div
      className={`flex ${
        isGrid ? "flex-col w-[305px]" : "flex-row"
      }  lg:gap-8 mt-4 gap-4`}
    >
      <div
        className="w-[305px] h-[164px] rounded-md border border-white overflow-hidden cursor-pointer relative"
        onClick={onClick}
      >
        <img
          src={PlayButton}
          alt="play button"
          className="absolute top-[42%] left-[47%]"
          width="32"
          height="32"
        />
        <img
          src={data?.info?.movie_image ? data?.info?.movie_image : noPoster}
          alt={data?.title}
          onError={addDefaultSrc}
          width="305"
          height="164"
        />
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <div className={`flex ${isGrid ? "flex-col" : "flex-row"} `}>
          <LabelText
            text={seasonName}
            textColor="text-white"
            fontSize="lg:text-2xl text-xl"
          />
          <LabelText
            text="-"
            textColor="text-white"
            fontSize="lg:text-2xl text-xl"
            className="mx-3"
          />
          <LabelText
            text={`S${data?.season} E${data?.episode_num}`}
            textColor="text-red-500"
            fontSize="lg:text-2xl text-xl"
          />
          <LabelText
            text="-"
            textColor="text-white"
            fontSize="lg:text-2xl text-xl"
            className="mx-3"
          />
          <LabelText
            text={data?.title}
            textColor="text-white"
            fontSize="lg:text-2xl text-xl"
          />
        </div>
        <LabelText
          text={secondsToMinutes(data?.info?.duration_secs)}
          textColor="text-white"
          fontSize="lg:text-xl text-base"
        />
      </div>
    </div>
  );
};

export default SingleEpisode;

SingleEpisode.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  isGrid: PropTypes.bool,
};
