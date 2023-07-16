import { css } from "@emotion/react";
import { aboutText } from "./constants";
import AboutHeader from "./AboutHeader";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { usePathStore } from "./store";

const aboutContainerStyle = () => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
  gap: 24px;
  padding: 0 40px 40px 40px;
`;

const textContainerStyle = () => css`
  height: 430px;
  /* height: 55%; */
  @media (min-width: 420px) {
    height: 530px;
    width: 307px;
  }
  padding: 20px 30px;
  overflow-y: scroll;
  border-radius: 12px;
  background: rgb(255, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.20354079131652658) 0%,
    rgba(251, 251, 251, 1) 50%,
    rgba(255, 0, 0, 0.20073967086834732) 100%
  );

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
  font-size: 15px;
  line-height: 1.7;
  letter-spacing: 0.125rem;
  color: var(--martha-secondary-color);
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
      <AboutHeader />
      <div css={textContainerStyle}>
        <p css={textStyle}>{aboutText}</p>
      </div>
    </div>
  );
};

export default About;
