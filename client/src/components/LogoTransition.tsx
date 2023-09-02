import { css } from "@emotion/react";
import LogoTransitionPng from "../../public/assets/svgs/logo_horizontal.png";
import { useEffect, useState } from "react";

const backgroundStyle = css`
  position: absolute;
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
  width: 100%;
  background-color: var(--martha-secondary-bg-color);
  top: 0;
  z-index: 999;
  @keyframes fadeinout {
    0% {
      opacity: 0;
    }
    33.33% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes fadeinout {
    /* Firefox */
    0% {
      opacity: 0;
    }
    33.33% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes fadeinout {
    /* Safari and Chrome */
    0% {
      opacity: 0;
    }
    33.33% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes fadeinout {
    /* Opera */
    0% {
      opacity: 0;
    }
    33.33% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  animation: fadeinout 3s ease-in-out;
  -moz-animation: fadeinout 3s ease-in-out; /* Firefox */
  -webkit-animation: fadeinout 3s ease-in-out; /* Safari and Chrome */
  -o-animation: fadeinout 3s ease-in-out; /* Opera */
  animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards; /* Firefox */
  -webkit-animation-fill-mode: forwards; /* Safari and Chrome */
  -o-animation-fill-mode: forwards; /* Opera */
`;

const logoWrapperStyle = css`
  position: relative;
  height: inherit;
`;

const logoStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  transform: translate(-50%);
`;

export interface LogoTransitionProps {}

const LogoTransition = (props: LogoTransitionProps) => {
  const { ...others } = props;

  return (
    <div css={backgroundStyle}>
      <div css={logoWrapperStyle}>
        <img src={LogoTransitionPng} alt="martha-logo" css={logoStyle} />
      </div>
    </div>
  );
};

export default LogoTransition;
