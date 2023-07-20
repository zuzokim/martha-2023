import { css } from "@emotion/react";
import {
  Main,
  About,
  JobSelect,
  PlayIntro,
  NavigationButtons,
  CreateMap,
  Playing,
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
  return (
    <BrowserRouter>
      <div css={slidesContainerStyle}>
        <SlideRoutes duration={1000}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/playintro" element={<PlayIntro />}></Route>
          <Route path="/jobselect" element={<JobSelect />}></Route>
          <Route path="/createmap" element={<CreateMap />}></Route>
          <Route path="/playing" element={<Playing />}></Route>
        </SlideRoutes>
        <NavigationButtons />
      </div>
    </BrowserRouter>
  );
};

export default App;
