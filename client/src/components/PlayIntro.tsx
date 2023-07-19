import { css } from "@emotion/react";

// import gif from "../../public/assets/svgs/Gameover.gif";
import textFrame from "../../public/assets/svgs/text_frame.png";
import { PREV_NAV_PATH, introText } from "./constants";
import { usePathStore } from "./store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PlayIntroHeader from "./PlayIntroHeader";

const playIntroContainerStyle = () => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
  gap: 24px;
  padding: 0 40px 40px 40px;
`;

const textContainerStyle = css`
  height: 430px;
  /* height: 55%; */
  /* border: 1px solid tomato; */
  @media (min-width: 420px) {
    height: 530px;
    width: 307px;
  }
  padding: 20px 30px;
  overflow-y: scroll;
  border-radius: 12px;
  background-size: 100%;
  background-image: url("../../public/assets/svgs/text_frame.png");

  ::-webkit-scrollbar-track {
    background-color: transparent;
    width: 20px;
    margin: 22px;
  }
  ::-webkit-scrollbar {
    width: 30px;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
    /* border-radius: 8px; */
    background-color: var(--martha-secondary-color);
    background-clip: padding-box;
    border-right: 24px solid transparent;
  }
`;

const textStyle = () => css`
  font-size: 17px;
  line-height: 1.7;
  letter-spacing: 0.125rem;
  color: var(--martha-secondary-color);
`;

export interface PlayIntroProps {}
const PlayIntro = (props: PlayIntroProps) => {
  const location = useLocation();

  const { setPath } = usePathStore();

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname, setPath]);

  return (
    <div css={playIntroContainerStyle}>
      <PlayIntroHeader />
      <div css={textContainerStyle}>
        <p css={textStyle}>{introText}</p>
      </div>
    </div>
  );
};

export default PlayIntro;
