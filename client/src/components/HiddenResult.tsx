import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Haemonging from "./Haemonging";
const { VITE_SOCKET_SERVER_URL, VITE_FLASK_SERVER_URL } = import.meta.env;
import GradientPng from "../../public/assets/svgs/gradient.png";

const gradientStyle = css`
  position: absolute;
  z-index: -1;
  top: 0;
  @media (min-width: 720px) {
    width: 70%;
    left: 50%;
    transform: translate(-50%);
  }
  width: 100%;
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
`;

const hiddenResultContainerStyle = () => css`
  height: 67vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const verticalBlueGradientStyle = css`
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  background: linear-gradient(
    90deg,
    #fff 1.56%,
    #a7f8ff 8.33%,
    #fff 34.3%,
    #fff 64.17%,
    #a7f8ff 89.58%,
    #fff 97.4%
  );
  backdrop-filter: blur(5px);
`;
const verticalRedGradientStyle = css`
  height: calc(var(--1svh, 1vh) * 100);
  height: 100svh;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  width: 100%; //TODO:
  background: linear-gradient(
    90deg,
    rgba(230, 248, 255, 0.21) 0%,
    rgba(197, 102, 105, 0.7) 15.63%,
    #e60706 28.13%,
    #e60706 71.35%,
    rgba(197, 102, 105, 0.7) 83.98%,
    rgba(230, 248, 255, 0.21) 100%
  );
  background-blend-mode: multiply;
  backdrop-filter: blur(15px);
`;

const imageCircularBackGroundContainerStyle = css`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: -18px;
`;

const imageBackgroundStyle = css`
  height: 320px;
  display: block;
`;

const imageBackgroundShadowStyle = css`
  height: 280px;
  aspect-ratio: 1 / 1.2;
  border-radius: 309px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 333px;
  background: rgba(255, 255, 255, 0.5);
  filter: blur(7.5px);
`;

const imageStyle = css`
  height: 258px;
  border-radius: 309px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const textContainerGradientStyle = css`
  border-radius: 8px;
  background: #d41817;
  filter: blur(10px);
  width: 300px;
  height: 200px;
  position: absolute;
  top: 55%;
  z-index: -1;
`;

const textContainerStyle = css`
  margin-top: -24px;
  margin-bottom: 8px;
  position: relative;
  overflow-y: scroll;
  width: 290px;
  height: 190px;
  @media (min-width: 420px) {
    height: 100%;
  }
  border-radius: 20px;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    rgba(230, 120, 123, 0.94) 0%,
    rgba(203, 51, 55, 0.94) 0.01%,
    #f0979a 7.76%,
    rgba(255, 230, 230, 0.78) 23.27%,
    #fff3f3 38.77%,
    #fff 51.56%,
    #fff3f3 65.28%,
    rgba(255, 230, 230, 0.78) 79.79%,
    #f0979a 91.29%,
    rgba(203, 51, 55, 0.94) 100%
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
  font-size: 17px;
  line-height: 1.8;
  letter-spacing: 0.125;
  color: var(--martha-secondary-color);
  padding: 0px 20px 0px 30px;
  position: relative;
  z-index: 2;
  white-space: pre-wrap;
`;

export interface HiddenResultProps {}
const HiddenResult = (props: HiddenResultProps) => {
  const userId = localStorage.getItem("userId");
  const [resultData, setResultData] = useState<any | null>(null);
  const [haemongDone, setHaemongDone] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  async function getHiddenResult() {
    try {
      const waitForHaemonging = await fetch(
        `http://192.168.0.36:5000/waitfor_hidden_result?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const waitForResult = await waitForHaemonging.json();

      setHaemongDone(Boolean(waitForResult));

      if (Boolean(waitForHaemonging)) {
        const response = await fetch(
          `http://192.168.0.36:5000/hidden_result?userId=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();

        setResultData(jsonData);
      }
    } catch (error) {
      console.log("Error fetching result:", error);
    }
  }

  useEffect(() => {
    getHiddenResult();
  }, []);

  const imageName = resultData?.hiddenResult.generatedImageName;

  useEffect(() => {
    if (imageName && typeof imageName === "string") {
      // Assuming imagePath is a valid string path to the image
      const image = new Image();
      image.src = `${VITE_FLASK_SERVER_URL}/static/${resultData?.hiddenResult.generatedImageName}`;
      const imagePath = `${VITE_FLASK_SERVER_URL}/static/${resultData?.hiddenResult.generatedImageName}`;
      image.onload = () => {
        setSrc(imagePath);
      };
    }
  }, [imageName]);

  return (
    <>
      {/* <div css={verticalBlueGradientStyle}>
        <div css={verticalRedGradientStyle} />
      </div> */}
      <img
        src={GradientPng}
        alt="gradient"
        css={gradientStyle}
        data-html2canvas-ignore="true"
      />
      <div css={hiddenResultContainerStyle} id="hidden-result-container">
        <div css={imageCircularBackGroundContainerStyle}>
          <svg
            id="image-container"
            css={imageBackgroundStyle}
            xmlns="http://www.w3.org/2000/svg"
            width="339"
            height="376"
            viewBox="0 0 339 376"
            fill="none"
          >
            <g filter="url(#filter0_f_394_268)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M169.5 361C254.828 361 324 283.545 324 188C324 92.4547 254.828 15 169.5 15C84.172 15 15 92.4547 15 188C15 283.545 84.172 361 169.5 361ZM169.5 350C248.753 350 313 279.037 313 191.5C313 103.963 248.753 33 169.5 33C90.2471 33 26 103.963 26 191.5C26 279.037 90.2471 350 169.5 350Z"
                fill="#CC0503"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_394_268"
                x="0"
                y="0"
                width="339"
                height="376"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="7.5"
                  result="effect1_foregroundBlur_394_268"
                />
              </filter>
            </defs>
          </svg>
          <div
            css={imageBackgroundShadowStyle}
            data-html2canvas-ignore="true"
          />
          {src && <img src={src} alt="generated_image" css={imageStyle} />}
        </div>
        <div css={textContainerGradientStyle} data-html2canvas-ignore="true" />
        <div css={textContainerStyle} id="text-container">
          <p css={textStyle}>{resultData?.hiddenResult?.generatedText}</p>
        </div>
        <Haemonging haemongDone={haemongDone} />
      </div>
    </>
  );
};

export default HiddenResult;
