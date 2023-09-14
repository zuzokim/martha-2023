import { css } from "@emotion/react";
import createMapGif from "../../public/assets/svgs/create_map.gif";
import { useJobSelectStore } from "./store";
import { connect } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { VITE_SOCKET_SERVER_URL } = import.meta.env;

const rootStyle = css`
  height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const gifContainerStyle = css`
  position: relative;
  height: 55vh;
`;

const createMapGifStyle = (mapCreated: boolean) => css`
  display: block;
  height: 50vh;
  position: absolute;
  top: 50%;
  left: -50%;
  transform: translate(-50%, -50%);
  margin: auto;
  z-index: -1;
  ${mapCreated &&
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

const createMapDoneTextStyle = css`
  position: absolute;
  top: 50%;
  transform: translateY(-100%);
  font-size: 17px;
  color: var(--martha-secondary-color);
  @keyframes fadeinout {
    0% {
      opacity: 0;
    }
    33.33% {
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
    33.33% {
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
    33.33% {
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
    33.33% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  animation: fadeinout 10s ease-in-out;
  -moz-animation: fadeinout 3s ease-in-out; /* Firefox */
  -webkit-animation: fadeinout 3s ease-in-out; /* Safari and Chrome */
  -o-animation: fadeinout 3s ease-in-out; /* Opera */
  animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards; /* Firefox */
  -webkit-animation-fill-mode: forwards; /* Safari and Chrome */
  -o-animation-fill-mode: forwards; /* Opera */
`;

export interface CreateMapProps {}

const CreateMap = (props: CreateMapProps) => {
  const { selectedJobInfo } = useJobSelectStore();
  const [isConnected, setIsConnected] = useState(false);
  const [mapCreated, setMapCreated] = useState(false);
  const [readyToPlay, setMapReadyToPlay] = useState(false);

  const URL = `${VITE_SOCKET_SERVER_URL}`;
  const socket = connect(URL);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      socket.connect();
      setIsConnected(false);
      socket.emit("Init", "Init");
    });
    socket.on("CreateMap", (data) => {
      setMapCreated(data === "Created");
      if (data === "Error") {
        //TODO: disconnected : reload 처리
        socket.emit("Init", "Init");
      }
    });
    socket.on("OnPlay", (data) => {
      setMapReadyToPlay(data === "Playing"); //Playing , Finished, Error
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("CreateMap");
    };
  }, [socket]);

  const navigate = useNavigate();

  useEffect(() => {
    if (readyToPlay) {
      navigate("/playing");
    }
  }, [readyToPlay]);

  return (
    <div css={rootStyle}>
      <div css={gifContainerStyle}>
        <img
          src={createMapGif}
          alt="create_map"
          css={createMapGifStyle(mapCreated)}
        />
      </div>
      {mapCreated && <h1 css={createMapDoneTextStyle}>스캔 준비 완료</h1>}
    </div>
  );
};

export default CreateMap;
