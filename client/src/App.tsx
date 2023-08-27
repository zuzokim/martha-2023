import { css } from "@emotion/react";
import {
  Main,
  About,
  JobSelect,
  PlayIntro,
  CreateMap,
  Playing,
  Haemonging,
  NormalResult,
  HiddenResult,
} from "./components";
import { Route, Routes, useLocation } from "react-router-dom";
import SlideRoutes from "react-slide-routes";
import TopButton from "./components/TopButton.tsx";
import Result from "./components/Result.tsx";
import BottomButton from "./components/BottomButton.tsx";
import "large-small-dynamic-viewport-units-polyfill";

const rootStyle = css`
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  position: relative;
  .slide-routes {
    /* need to be set to 100% for 'fullpage' slides */
    width: 100%;
  }
`;

const App = () => {
  return (
    <div css={rootStyle}>
      <TopButton />
      <SlideRoutes duration={1000}>
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
    </div>
  );
};

export default App;
