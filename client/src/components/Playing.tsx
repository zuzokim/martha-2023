import { css } from "@emotion/react";
import playGif from "../../public/assets/svgs/play.gif";
import { useJobSelectStore, useTriggerFoundStore } from "./store";
import { connect } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
const { VITE_SOCKET_SERVER_URL, VITE_FLASK_SERVER_URL } = import.meta.env;

const rootStyle = css`
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
`;
const gifContainerStyle = (triggerFound: boolean) => css`
  position: relative;
  height: 100%;
  ${triggerFound &&
  css`
    animation: fadeout 4s;
    -moz-animation: fadeout 4s; /* Firefox */
    -webkit-animation: fadeout 4s; /* Safari and Chrome */
    -o-animation: fadeout 4s; /* Opera */
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  margin: 0;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 0.3px;
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

  /* animation: fadeinout 7s ease-in-out;
  -moz-animation: fadeinout 7s ease-in-out; 
  -webkit-animation: fadeinout 7s ease-in-out; 
  -o-animation: fadeinout 7s ease-in-out;
  animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards; 
  -webkit-animation-fill-mode: forwards; 
  -o-animation-fill-mode: forwards; Opera */
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
  const { triggerFound, setTriggerFound } = useTriggerFoundStore();
  const [resultStatus, setResultStatus] = useState<"Normal" | "Hidden" | null>(
    null
  );

  const URL = `${VITE_SOCKET_SERVER_URL}`;
  const socket = connect(URL);

  const dateTime = DateTime.now()
    .setZone("Asia/Seoul")
    .toFormat("yyyy-MM-dd'T'HH:mm:ss");

  useEffect(() => {
    socket.on("OnPlay", (data) => {
      setPlayStatus(data);
      if (data === "TriggerFound") {
        setTriggerFound(true);
      }
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

  async function savePlay(
    playStatusData: PlayStatusData,
    status: "play" | "end"
  ) {
    try {
      const response = await fetch(`${VITE_FLASK_SERVER_URL}/play`, {
        method: status === "play" ? "POST" : "PUT",
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

  useEffect(() => {
    return () => {
      setTriggerFound(false);
    };
  }, []);

  const initialTime = 120;
  const [time, setTime] = useState<number>(initialTime);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div css={rootStyle}>
      <div css={gifContainerStyle(triggerFound)}>
        <img
          src={playGif}
          alt="playing"
          css={playingGifStyle(playStatus === "Playing")}
        />
        <div css={playingGuideTextStyle}>
          <p
            css={css`
              font-family: "Baunk";
              font-size: 38px;
              margin: 0;
              line-height: 1;
            `}
          >
            {formatTime(time)}
          </p>
          사운드에 집중하세요
        </div>
      </div>
      {triggerFound && (
        <h1 css={triggerFoundTextStyle}>베타파형과 결합을 완료했습니다!</h1>
      )}
    </div>
  );
};

export default Playing;
