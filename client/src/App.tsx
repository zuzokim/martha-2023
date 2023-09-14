import { css } from "@emotion/react";
import {
  Main,
  About,
  JobSelect,
  PlayIntro,
  CreateMap,
  Playing,
  NormalResult,
  HiddenResult,
  Error,
} from "./components";
import { Route, Routes, useLocation } from "react-router-dom";
import SlideRoutes from "react-slide-routes";
import TopButton from "./components/TopButton.tsx";
import BottomButton from "./components/BottomButton.tsx";
import "large-small-dynamic-viewport-units-polyfill";
import { useEffect, useState } from "react";
const { VITE_SOCKET_SERVER_URL } = import.meta.env;
import { connect } from "socket.io-client";
import { useErrorStore } from "./components/store.ts";

const rootStyle = (isHiddenResult: boolean, isNormalResult: boolean) => css`
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${isHiddenResult ? "0" : "28px"};
  position: relative;
  ${isNormalResult &&
  css`
    gap: 16px;
  `}
  .slide-routes {
    /* need to be set to 100% for 'fullpage' slides */
    width: 100%;
  }
`;

const App = () => {
  const { pathname } = useLocation();
  const isHiddenResult = pathname === "/hidden-result";
  const isNormalResult = pathname === "/normal-result";
  const usingSlide =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/playintro" ||
    pathname === "/jobselect";

  const URL = `${VITE_SOCKET_SERVER_URL}`;
  const socket = connect(URL);

  const { setHasError, hasError } = useErrorStore();

  useEffect(() => {
    socket.on("CreateMap", (data) => {
      if (data === "Error") {
        setHasError(true);
      }
    });
    socket.on("OnPlay", (data) => {
      if (data === "Error") {
        setHasError(true);
      }
    });
    socket.on("GameOver", (data) => {
      if (data === "Error") {
        setHasError(true);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return (
    <div css={() => rootStyle(isHiddenResult, isNormalResult)} id="app">
      <TopButton />
      <SlideRoutes duration={usingSlide ? 1000 : 0}>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/playintro" element={<PlayIntro />}></Route>
        <Route path="/jobselect" element={<JobSelect />}></Route>
        <Route path="/createmap" element={<CreateMap />}></Route>
        <Route path="/playing" element={<Playing />}></Route>
        <Route path="/normal-result" element={<NormalResult />}></Route>
        <Route path="/hidden-result" element={<HiddenResult />}></Route>
      </SlideRoutes>
      <BottomButton />
      {hasError && <Error />}
    </div>
  );
};

export default App;
