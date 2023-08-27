import { css } from "@emotion/react";
import { introText } from "./constants";
import { usePathStore } from "./store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Haemonging from "./Haemonging";

const hiddenResultContainerStyle = () => css`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const textContainerStyle = css`
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

export interface HiddenResultProps {}
const HiddenResult = (props: HiddenResultProps) => {
  const location = useLocation();

  const { setPath } = usePathStore();

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname, setPath]);
  
  const haemongDone = true;

  return (
    <div css={hiddenResultContainerStyle}>
      <div css={textContainerStyle}>
        <p css={textStyle}>{introText}</p>
      </div>
      <Haemonging haemongDone={haemongDone} />
    </div>
  );
};

export default HiddenResult;
