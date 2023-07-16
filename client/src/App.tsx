import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { connect } from "socket.io-client";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
import {
  Main,
  About,
  JobSelect,
  PlayIntro,
  NavigationButtons,
  CreateMap,
} from "./components";
import { BrowserRouter, Route } from "react-router-dom";
import SlideRoutes from "react-slide-routes";

const slidesContainerStyle = css`
  display: grid;
  place-items: center;
  height: 100svh;
  position: relative;
  /* border: 1px solid blue; */
  .slide-routes {
    /* need to be set to 100% for 'fullpage' slides */
    width: 100%;
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

  const handleClick = async () => {
    const response = await fetch("http://localhost:5000/job_list");
    const jsonData = await response.json();
    console.log(jsonData, "data");
  };

  return (
    <BrowserRouter>
      <div css={slidesContainerStyle}>
        <SlideRoutes duration={1000}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/playintro" element={<PlayIntro />}></Route>
          <Route path="/jobselect" element={<JobSelect />}></Route>
          <Route path="/createmap" element={<CreateMap />}></Route>
        </SlideRoutes>
        <NavigationButtons />
        {/* <button onClick={handleClick}>fetch</button> */}
      </div>
    </BrowserRouter>
  );
};

export default App;

//   Slide 1
// <div>
//   <p>Connected: {"" + isConnected}</p>
//   <p>Last message: {lastMessage || "-"}</p>
//   <button onClick={sendMessage}>send message</button>
//   <p>한글 폰트 적용</p>
// </div>
// <BrowserRouter>
//   <div css={swiperStyle(slideIndex)}>
//     <Swiper
//       effect="fade"
//       modules={[Navigation, Pagination, Mousewheel, Keyboard]}
//       navigation={true}
//       keyboard={true}
//       speed={1000}
//       className="mySwiper"
//       onSlideChange={(swiper) => {
//         setSlideIndex(swiper.activeIndex);
//       }}
//       onSwiper={(swiper) => {
//         // console.log(swiper);
//       }}
//     >
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <SwiperSlide>
//               <Main
//                 onClick={(navigationType) => {
//                   console.log("her", navigationType);
//                   setSlideType(navigationType);
//                   setSlideIndex((prev) => prev + 1);
//                 }}
//               />
//             </SwiperSlide>
//           }
//         ></Route>
//         <Route
//           path="/play-intro"
//           element={
//             <SwiperSlide>
//               <PlayIntro />
//             </SwiperSlide>
//           }
//         ></Route>

//         {/* TODO: could be just one component with different nav type
//         {/* 1 */}
//         {slideType === "PLAY_INTRO" && (
//           <SwiperSlide>
//             <PlayIntro />
//           </SwiperSlide>
//         )}
//         {/* 1 */}
//         {slideType === "ABOUT" && (
//           <SwiperSlide>
//             <About />
//           </SwiperSlide>
//         )}
//         {/* 2 */}
//         <SwiperSlide>
//           <JobSelect
//             onSelect={(navigationType) => {
//               setSlideIndex((prev) => prev + 1);
//             }}
//           />
//         </SwiperSlide>
//       </Routes>
//     </Swiper>
//   </div>
// </BrowserRouter>
