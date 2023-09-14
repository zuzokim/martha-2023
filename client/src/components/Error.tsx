import { css } from "@emotion/react";
import SvgComponent from "./SvgComponent";
import HomeButtonPng from "../../public/assets/svgs/home_button.png";
import { useLocation, useNavigate } from "react-router";
import { useErrorStore } from "./store";
import { useEffect, useState } from "react";
import { LogoTransition } from ".";

const errorContainerStyle = css`
  border-radius: 8px;
  border: 1px solid var(--martha-secondary-color);
  background: #fff;
  height: 126px;
  width: 60%;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export interface ErrorProps {}

const Error = (props: ErrorProps) => {
  const { ...others } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setFromError, setHasError } = useErrorStore();
  const [showLogoTransition, setShowLogoTransition] = useState(false);

  //need to not render transparent LogoTransition when finally came back to root path
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pathname === "/") {
        setShowLogoTransition(false);
      }
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <>
      <div css={errorContainerStyle}>
        <h1
          css={css`
            font-family: "HelveticaNeueLTStd-Ex";
            color: var(--martha-secondary-color);
            font-size: 20px;
            line-height: 1;
            margin: 0;
            margin-top: 8px;
          `}
        >
          Error
        </h1>
        <SvgComponent
          role="button"
          aria-label="home-button"
          src={HomeButtonPng}
          css={css`
            display: block;
            width: 60%;
            min-width: 140px;
            max-width: 154px;
            &:hover {
              cursor: pointer;
            }
          `}
          alt="nextButton"
          onClick={() => {
            setFromError(true);
            setShowLogoTransition(true);
            navigate("/");
            setHasError(false);
            localStorage.removeItem("userId");
          }}
          {...others}
        />
      </div>
      {showLogoTransition && <LogoTransition />}
    </>
  );
};

export default Error;
