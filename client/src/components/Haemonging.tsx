import { css } from "@emotion/react";
import HaemongingGif from "../../public/assets/svgs/play.gif"; //TODO: change gif
import { generateRandomIndex, haemongingText } from "./constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const rootStyle = (haemongDone: boolean) => css`
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
  background-color: pink;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
  ${haemongDone &&
  css`
    animation: fadeout 3s;
    -moz-animation: fadeout 3s; /* Firefox */
    -webkit-animation: fadeout 3s; /* Safari and Chrome */
    -o-animation: fadeout 3s; /* Opera */
    animation-fill-mode: forwards;
    @keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        z-index: -1;
      }
    }
    @-moz-keyframes fadeout {
      /* Firefox */
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        z-index: -1;
      }
    }
    @-webkit-keyframes fadeout {
      /* Safari and Chrome */
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        z-index: -1;
      }
    }
    @-o-keyframes fadeout {
      /* Opera */
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        z-index: -1;
      }
    }
  `}
`;

const haemongingGifWrapperStyle = css`
  height: 100%;
  z-index: 1;
  position: absolute;
  isolation: isolate;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  transform-origin: center;
`;

const haemongingGifStyle = () => css`
  height: inherit;
`;

const heamongingTextWrapperStyle = css`
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translate(-50%);
  z-index: 2;
`;

const haemongingTextStyle = css`
  font-size: 17px;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: #c90303;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  word-break: keep-all;
  width: 300px;
`;

export interface HaemongingProps {
  haemongDone: boolean;
}

const Haemonging = (props: HaemongingProps) => {
  const { haemongDone, ...others } = props;

  return (
    <div
      css={rootStyle(haemongDone)}
      {...others}
      id="haemonging"
      data-html2canvas-ignore="true"
    >
      <div css={haemongingGifWrapperStyle}>
        <img src={HaemongingGif} alt="haemonging" css={haemongingGifStyle} />
      </div>
      <div css={heamongingTextWrapperStyle}>
        <p css={haemongingTextStyle}>{haemongingText[generateRandomIndex()]}</p>
      </div>
    </div>
  );
};

export default Haemonging;
