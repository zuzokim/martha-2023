import SvgComponent from "./SvgComponent";
import IntroButtonPng from "../../public/assets/svgs/intro_button.png";
import LogoHeaderPng from "../../public/assets/svgs/logo_header.png";
import HeaderRoundPng from "../../public/assets/svgs/header_round.png";
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

export interface TopButtonProps {}
const TopButton = (props: TopButtonProps) => {
  const { ...others } = props;

  const location = useLocation();
  const { pathname } = location;

  let src = null;
  let headerText = null;

  switch (pathname) {
    case "/":
      src = IntroButtonPng;
      break;
    case "/about":
      src = LogoHeaderPng;
      break;
    case "/playintro":
      src = HeaderRoundPng;
      headerText = "플레이 안내";
      break;
    case "/jobselect":
      src = HeaderRoundPng;
      headerText = "직업 선택";
      break;
    case "/createmap":
      break;
    case "/playing":
      break;
    case "/normal-result":
      src = HeaderRoundPng;
      headerText = "당신이 꾼 꿈은..";
      break;
    case "/hidden-result":
      src = HeaderRoundPng;
      headerText = "당신이 꾼 꿈은..";
      break;
  }

  const navigate = useNavigate();
  const handleClick = (to: string) => {
    if (pathname === "/") {
      navigate(to);
    }
  };

  const disablePathChange = pathname !== "/";
  const hideTopButton = pathname === "/playing";

  const isHiddenResultPage = pathname === "/hidden-result";

  return (
    <div
      css={css`
        display: ${hideTopButton ? "none" : "flex"};
        justify-content: center;
        position: relative;
        min-height: 46px;
        &:hover {
          cursor: ${disablePathChange ? "default" : "pointer"};
        }
        &:active {
          opacity: ${disablePathChange ? "1" : "0.7"};
        }
      `}
    >
      {src && (
        <SvgComponent
          role="button"
          aria-label="headerButton"
          src={src}
          css={css`
            display: flex;
            justify-content: center;
            width: ${isHiddenResultPage ? "60%" : "50%"};
            display: block;
          `}
          alt="headerButton"
          onClick={() => handleClick("/about")}
          {...others}
        />
      )}
      <h1 css={headerTextStyle}>{headerText}</h1>
    </div>
  );
};

export default TopButton;
