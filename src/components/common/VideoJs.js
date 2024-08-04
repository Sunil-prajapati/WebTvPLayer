import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-errors';
import '@videojs/themes/dist/forest/index.css';
import '../../styles/component/videojs.scss';
import { SKIP_TIME } from '../../constant/enum';
import Backward from '../../assets/svg/backward.svg'

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);

        //Backward button
        const backwardButton = document.createElement('button');
        backwardButton.className = 'vjs-control vjs-button vjs-backward-button';
        backwardButton.innerHTML = `<img src=${Backward} alt='backward' width='30' class="hover-backward backward-icon" height='25'/>`;
        backwardButton.addEventListener('click', () => {
          const currentTime = player.currentTime();
          player.currentTime(currentTime - SKIP_TIME.BACKWARD); // Adjust the backward duration as needed
        });
        player.controlBar.el().appendChild(backwardButton);

        //Forward Button
        const forwardButton = document.createElement('button');
        forwardButton.className = 'vjs-control vjs-button vjs-backward-button';
        forwardButton.innerHTML = `<img src=${Backward} alt='backward' width='30' class="hover-backward " height='25'/>`;
        forwardButton.addEventListener('click', () => {
          const currentTime = player.currentTime();
          player.currentTime(currentTime + SKIP_TIME.FORWARD); // Adjust the backward duration as needed
        });
        player.controlBar.el().appendChild(forwardButton);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }

  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} className='vjs-theme-forest'/>
    </div>
  );
}

export default VideoJS;