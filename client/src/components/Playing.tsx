import { css } from "@emotion/react";
import playGif from "../../public/assets/svgs/play.gif";
import { useJobSelectStore } from "./store";
import { connect } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

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

const triggerFoundTextStyle = css`
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  color: black;
  white-space: nowrap;
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

  animation: fadeinout 8s ease-in-out;
  -moz-animation: fadeinout 8s ease-in-out; /* Firefox */
  -webkit-animation: fadeinout 8s ease-in-out; /* Safari and Chrome */
  -o-animation: fadeinout 8s ease-in-out; /* Opera */
  animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards; /* Firefox */
  -webkit-animation-fill-mode: forwards; /* Safari and Chrome */
  -o-animation-fill-mode: forwards; /* Opera */
`;

type PlayStatusData = {
  userId: string;
  startTime?: string | null;
  endTime?: string | null;
  selectedJobId?: number;
};

export interface PlayingProps {}

const Playing = (props: PlayingProps) => {
  const [playStatus, setPlayStatus] = useState<
    "Playing" | "Exiting" | "TriggerFound" | "Error" | null
  >(null);
  const [resultStatus, setResultStatus] = useState<"Normal" | "Hidden" | null>(
    null
  );

  const URL = `http://192.168.0.36:8000`;
  const socket = connect(URL);

  const dateTime = DateTime.now()
    .setZone("Asia/Seoul")
    .toFormat("yyyy-MM-dd'T'HH:mm:ss");

  useEffect(() => {
    socket.on("OnPlay", (data) => {
      setPlayStatus(data);
    });
    socket.on("GameOver", (data) => {
      setResultStatus(data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("OnPlay");
    };
  }, [socket]);

  const { selectedJobInfo } = useJobSelectStore();
  const clientUserId = localStorage.getItem("userId") ?? "";

  async function savePlay(playStatusData: PlayStatusData) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/play`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playStatusData),
      });
    } catch (error) {
      console.log(error);
      // throw new Error(error.message);
    }
  }

  useEffect(() => {
    if (resultStatus) {
      socket.emit("Init", "Init");

      const playFinishingData = {
        userId: clientUserId,
        endTime: dateTime,
      };
      savePlay(playFinishingData, "end");
    }
  }, [resultStatus]);

  const navigate = useNavigate();

  useEffect(() => {
    if (resultStatus === "Normal") {
      navigate("/normal-result");
    } else if (resultStatus === "Hidden") {
      navigate("/hidden-result");
    }
  }, [resultStatus]);

  useEffect(() => {
    const playStartingData = {
      userId: clientUserId,
      startTime: dateTime,
    };

    savePlay(playStartingData, "play");
  }, []);

  const triggerFound = playStatus === "TriggerFound";

  return (
    <div css={rootStyle}>
      <div css={gifContainerStyle}>
        <img
          src={playGif}
          alt="playing"
          css={playingGifStyle(playStatus === "Playing")}
        />
        <h1 css={playingGuideTextStyle}>사운드에 집중하세요</h1>
        {triggerFound && (
          <h1 css={triggerFoundTextStyle}>숨겨진 트리거를 발견했습니다</h1>
        )}
      </div>
    </div>
  );
};

export default Playing;
