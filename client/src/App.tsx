import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { io, connect } from "socket.io-client";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Main, Intro, JobSelect } from "./components";
import SwiperSlides from "./components/SwiperSlides";
import { NavigationType } from "./components/Main";

const swiperStyle = (slideIndex: number) => css`
  .swiper {
    width: 100%;
    height: 100svh;
  }

  .swiper-slide {
    text-align: center;
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* var(--swiper-navigation-sides-offset, 100px) */

  .swiper-button-prev {
    top: unset;
    left: 150px;
    bottom: 100px;
    background: url(../public/assets/svgs/prev_button.svg) no-repeat;
    background-position: center;
  }

  .swiper-button-next {
    top: unset;
    right: 150px;
    bottom: 100px;
    background: url(../public/assets/svgs/next_button.svg) no-repeat;
    background-position: center;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
  .swiper-button-prev,
  .swiper-button-next {
    ${slideIndex === 0 &&
    css`
      display: none;
    `}
  }
`;

const App = () => {
  const URL = `http://localhost:8000`;
  const socket = connect(URL, { autoConnect: false });

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("message", (data) => {
      setLastMessage(data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit("message", "Hello! Martha");
    // TODO: https://socket.io/docs/v4/emitting-events/
  };

  //   Slide 1
  // <div>
  //   <p>Connected: {"" + isConnected}</p>
  //   <p>Last message: {lastMessage || "-"}</p>
  //   <button onClick={sendMessage}>send message</button>
  //   <p>한글 폰트 적용</p>
  // </div>

  const [slideIndex, setSlideIndex] = useState(1);
  const [slideType, setSlideType] = useState<NavigationType>("PLAY");

  return (
    <div css={swiperStyle(slideIndex)}>
      <Swiper
        effect="fade"
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        navigation={true}
        keyboard={true}
        speed={1000}
        className="mySwiper"
        onSlideChange={(swiper) => {
          setSlideIndex(swiper.activeIndex);
        }}
        onSwiper={(swiper) => {
          console.log(swiper);
        }}
      >
        {/* 0 */}
        <SwiperSlide>
          <Main
            onClick={(navigationType) => {
              setSlideType(navigationType);
              setSlideIndex((prev) => prev + 1);
            }}
          />
        </SwiperSlide>
        {/* TODO: could be just one component with different nav type */}
        {/* 1 */}
        {slideType === "PLAY" && (
          <SwiperSlide>
            <div>play</div>
          </SwiperSlide>
        )}
        {/* 1 */}
        {slideType === "INTRO" && (
          <SwiperSlide>
            <Intro />
          </SwiperSlide>
        )}
        {/* 2 */}
        <SwiperSlide>
          <JobSelect
            onSelect={(navigationType) => {
              setSlideIndex((prev) => prev + 1);
            }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default App;
