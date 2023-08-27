import SvgComponent from "./SvgComponent";
import PlayButtonPng from "../../public/assets/svgs/play_button.png";
import HomeButtonPng from "../../public/assets/svgs/home_button.png";
import PrintButtonPng from "../../public/assets/svgs/print_button.png";
import ArrowLeft from "../../public/assets/svgs/arrow_left.png";
import ArrowRight from "../../public/assets/svgs/arrow_right.png";

import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router";

const headerTextStyle = css`
  font-family: var(--martha-font-arita-dotum-medium);
  color: var(--martha-secondary-color);
  font-size: 15px;
  line-height: 1;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -100%);
  white-space: nowrap;
`;

export interface BottomButtonProps {}
const BottomButton = (props: BottomButtonProps) => {
  const { ...others } = props;

  const location = useLocation();
  const { pathname } = location;

  let leftSrc = null;
  let rightSrc = null;
  let instructionText = null;
  let prevPath: string | null = null;
  let nextPath: string | null = null;

  switch (pathname) {
    case "/":
      rightSrc = PlayButtonPng;
      nextPath = "/playintro";
      break;
    case "/about":
      leftSrc = ArrowLeft;
      prevPath = "/";
      break;
    case "/playintro":
      leftSrc = ArrowLeft;
      rightSrc = ArrowRight;
      prevPath = "/";
      nextPath = "/jobselect";
      break;
    case "/jobselect":
      leftSrc = ArrowLeft;
      rightSrc = ArrowRight;
      prevPath = "/playintro";
      nextPath = "/createmap";
      break;
    case "/createmap":
      break;
    case "/playing":
      break;
    case "/normal-result":
      leftSrc = HomeButtonPng;
      rightSrc = PrintButtonPng;
      prevPath = "/";
      break;
    case "/hidden-result":
      leftSrc = HomeButtonPng;
      rightSrc = PrintButtonPng;
      prevPath = "/";
      break;
  }

  const showChangePathButtons = pathname !== "/";

  const navigate = useNavigate();

  const handlePrevClick = () => {
    if (prevPath) {
      navigate(prevPath);
    }
  };

  const handleNextClick = () => {
    if (nextPath) {
      navigate(nextPath);
    }
  };

  const disablePathChange = pathname === "/playing";
  const isResult =
    pathname === "/normal-result" || pathname === "/hidden-result";

  return (
    <div
      css={css`
        display: ${disablePathChange ? "none" : "flex"};
        justify-content: center;
        align-items: center;
        position: relative;
        min-height: 46px;
        &:hover {
          cursor: pointer;
        }
      `}
    >
      {leftSrc && (
        <SvgComponent
          role="button"
          aria-label="prevButton"
          src={leftSrc}
          css={css`
            display: flex;
            justify-content: center;

            width: ${showChangePathButtons ? "14px" : "50%"};
            height: ${showChangePathButtons ? "24px" : "none"};
            ${isResult &&
            css`
              width: 113px;
              height: auto;
            `}
            display: block;
            &:active {
              opacity: 0.7;
            }
          `}
          alt="prevButton"
          onClick={handlePrevClick}
          {...others}
        />
      )}
      {rightSrc && (
        <SvgComponent
          role="button"
          aria-label="nextButton"
          src={rightSrc}
          css={css`
            display: flex;
            justify-content: center;
            width: ${showChangePathButtons ? "14px" : "50%"};
            height: ${showChangePathButtons ? "24px" : "none"};
            ${isResult &&
            css`
              width: 113px;
              height: auto;
            `}
            display: block;
            margin-left: 16px;
            &:active {
              opacity: 0.7;
            }
          `}
          alt="nextButton"
          onClick={handleNextClick}
          {...others}
        />
      )}
      {instructionText && <h1 css={headerTextStyle}>{instructionText}</h1>}
    </div>
  );
};

export default BottomButton;
