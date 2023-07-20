import { css } from "@emotion/react";
import createMapGif from "../../public/assets/svgs/create_map.gif";
import { useJobSelectStore } from "./store";
import { connect } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const rootStyle = css`
  height: 100svh;
`;
const gifContainerStyle = css`
  position: relative;
  height: 50%;
  width: 100%;
`;

const createMapGifStyle = (mapCreated: boolean) => css`
  position: absolute;
  left: -100%; /* anchor the image corners outside the viewable area (increase for large images) */
  right: -100%;
  top: 0;
  bottom: -100%;
  width: auto; /* dynamic width based on viewable area */
  height: 100%; /* set height (swap these for variable height) */
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
  font-size: 17px;
  color: var(--martha-secondary-color);
  text-align: center;
  transform: translateY(-100%);
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

  animation: fadeinout 3s ease-in-out;
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

  const URL = `http://localhost:8000`;
  const socket = connect(URL);

  useEffect(() => {
    //connect and send jobType to socket server :
    socket.emit("CreateMap", `${selectedJobInfo.jobType}`);
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      socket.emit("Init", "Init");
    });
    socket.on("CreateMap", (data) => {
      setMapCreated(data === "Created");
      if (data === "Error") {
        //TODO: disconnected : init / reload 처리
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

  useEffect(() => {
    if (!isConnected) {
      //TODO: disconnected : init / reload 처리
    }
  }, [isConnected]);

  return (
    <div css={rootStyle}>
      <div css={gifContainerStyle}>
        <img
          src={createMapGif}
          alt="create_map"
          css={createMapGifStyle(mapCreated)}
        />
      </div>
      {mapCreated && (
        <>
          <h1 css={createMapDoneTextStyle}>맵 생성 완료</h1>
        </>
      )}
    </div>
  );
};

export default CreateMap;
