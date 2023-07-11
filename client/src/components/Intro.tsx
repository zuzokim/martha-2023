import { css } from "@emotion/react";
import { ReactComponent as IntroTitle } from "../../public/assets/svgs/intro_title.svg";
import { introText } from "./constants";

const introContainerStyle = () => css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const textContainerStyle = () => css`
  width: 290px;
  height: 530px;
  padding: 20px;
  overflow: scroll;
  background-color: lightgray;
`;

export type NavigationType = "PLAY" | "INTRO";

export interface IntroProps {}
const Intro = (props: IntroProps) => {
  return (
    <div css={introContainerStyle}>
      <IntroTitle />
      <div css={textContainerStyle}>
        <p>{introText}</p>
      </div>
    </div>
  );
};

export default Intro;
