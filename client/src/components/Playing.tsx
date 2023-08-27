import { css } from "@emotion/react";
import playGif from "../../public/assets/svgs/play.gif";
import { useJobSelectStore } from "./store";
import { connect } from "socket.io-client";
import { useEffect, useState } from "react";

const rootStyle = css`
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
`;
const gifContainerStyle = css`
  position: relative;
  height: 100%;
`;

const playingGifStyle = (playing: boolean) => css`
  position: absolute;
  top: 0;
  left: -100%; /* anchor the image corners outside the viewable area (increase for large images) */
  right: -100%;
  width: auto; /* dynamic width based on viewable area */
  height: 100%; /* set height (swap these for variable height) */
  margin: auto;
  transform: rotate(90deg) scale(0.8);
  @media (min-width: 420px) {
    transform: none;
    width: 100%;
  }
  ${playing &&
  css`
    animation: fadeout 3s;
    -moz-animation: fadeout 3s; /* Firefox */
    -webkit-animation: fadeout 3s; /* Safari and Chrome */
    -o-animation: fadeout 3s; /* Opera */
    animation-fill-mode: forwards;
    @keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-moz-keyframes fadeout {
      /* Firefox */
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-webkit-keyframes fadeout {
      /* Safari and Chrome */
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-o-keyframes fadeout {
      /* Opera */
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `}
`;

const playingGuideTextStyle = css`
  position: absolute;
  margin: 0;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #c90303; //var(--martha-secondary-color);
  @keyframes fadeinout {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes fadeinout {
    /* Firefox */
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes fadeinout {
    /* Safari and Chrome */
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes fadeinout {
    /* Opera */
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  animation: fadeinout 7s ease-in-out;
  -moz-animation: fadeinout 7s ease-in-out; /* Firefox */
  -webkit-animation: fadeinout 7s ease-in-out; /* Safari and Chrome */
  -o-animation: fadeinout 7s ease-in-out; /* Opera */
  animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards; /* Firefox */
  -webkit-animation-fill-mode: forwards; /* Safari and Chrome */
  -o-animation-fill-mode: forwards; /* Opera */
`;

export interface PlayingProps {}

const Playing = (props: PlayingProps) => {
  const [playing, setPlaying] = useState(false);

  const URL = `http://localhost:8000`;
  const socket = connect(URL, { autoConnect: false });

  useEffect(() => {
    socket.on("connect", () => {
      // setIsConnected(true);
    });
    socket.on("disconnect", () => {
      // setIsConnected(false);
    });
    // socket.on("CreateMap", (data) => {
    //   setMapCreated(data === "Created");
    // });
    socket.on("OnPlay", (data) => {
      setPlaying(data === "Playing"); //Playing , Finished, Error
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("OnPlay");
    };
  }, [socket]);

  //TODO: 숨겨진 트리거를 발견했습니다
  return (
    <div css={rootStyle}>
      <div css={gifContainerStyle}>
        <img src={playGif} alt="playing" css={playingGifStyle(playing)} />
        <h1 css={playingGuideTextStyle}>사운드에 집중하세요</h1>
      </div>
    </div>
  );
};

export default Playing;
