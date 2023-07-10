import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { io, connect } from "socket.io-client";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Main } from "./components";

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
  const socket = connect(URL);

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

  //must be in Swiper context :
  // const swiper = useSwiper();
  // const swiperSlide = useSwiperSlide();
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <div css={swiperStyle(slideIndex)}>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        speed={1000}
        className="mySwiper"
        autoplay={true}
        onSlideChange={(swiper) => {
          setSlideIndex(swiper.activeIndex);
        }}
        onSwiper={(swiper) => {
          console.log(swiper);
        }}
      >
        <SwiperSlide>
          <Main />
        </SwiperSlide>

        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default App;
