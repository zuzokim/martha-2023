import { css } from "@emotion/react";
import { aboutText } from "./constants";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { usePathStore } from "./store";

const aboutContainerStyle = () => css`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const textContainerStyle = () => css`
  height: 100%;
  width: 307px;
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
  line-height: 1.8;
  letter-spacing: 0.125rem;
  color: var(--martha-secondary-color);
  padding: 0px 20px 0px 30px;
`;

export interface AboutProps {}
const About = (props: AboutProps) => {
  const location = useLocation();

  const { setPath } = usePathStore();

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname, setPath]);

  return (
    <div css={aboutContainerStyle}>
      <div css={textContainerStyle}>
        <p css={textStyle}>{aboutText}</p>
      </div>
    </div>
  );
};

export default About;
