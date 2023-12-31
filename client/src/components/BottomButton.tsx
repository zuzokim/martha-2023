import SvgComponent from "./SvgComponent";
import PlayButtonPng from "../../public/assets/svgs/play_button.png";
import HomeButtonPng from "../../public/assets/svgs/home_button.png";
import PrintButtonPng from "../../public/assets/svgs/print_button.png";
import ArrowLeft from "../../public/assets/svgs/arrow_left.png";
import ArrowRight from "../../public/assets/svgs/arrow_right.png";

import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router";
import html2canvas from "html2canvas";
import { useErrorStore, useJobSelectStore } from "./store";
import { connect } from "socket.io-client";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import LogoTransition from "./LogoTransition";
const { VITE_SOCKET_SERVER_URL, VITE_FLASK_SERVER_URL } = import.meta.env;

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
  let state: string | null = "normal";

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
      state = "transition";
      break;
    case "/hidden-result":
      leftSrc = HomeButtonPng;
      rightSrc = PrintButtonPng;
      prevPath = "/";
      state = "transition";
      break;
  }

  const showChangePathButtons = pathname !== "/";

  const navigate = useNavigate();

  const [showLogoTransition, setShowLogoTransition] = useState(false);
  const { fromError, setFromError } = useErrorStore();

  const URL = `${VITE_SOCKET_SERVER_URL}`;
  const socket = connect(URL);

  const handlePrevClick = () => {
    if (prevPath) {
      if (prevPath === "/" && (state === "transition" || fromError)) {
        setShowLogoTransition(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        //logo transition중에는 다른 인터랙션을 방지해야하므로 clearTimeout하지 않음
        localStorage.removeItem("userId");
        setFromError(false);
      } else {
        navigate(prevPath);
      }
      socket.emit("Init", "Init");
    }
  };

  const handleNextClick = () => {
    if (nextPath) {
      navigate(nextPath);
    }
  };

  const { selectedJobInfo } = useJobSelectStore();

  const handleSelect = async () => {
    const URL = `${VITE_SOCKET_SERVER_URL}`;
    const socket = connect(URL);
    socket.emit("CreateMap", `${selectedJobInfo?.jobType}`);
    try {
      const response = await fetch(
        `${VITE_FLASK_SERVER_URL}/job_list/${selectedJobInfo.jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: clientUserId }),
        }
      );
    } catch (error) {
      console.log(error);
      // throw new Error(error.message);
    }
  };

  const handleCapture = () => {
    const onSaveAs = (uri: string, filename: string) => {
      localStorage.setItem("capturedOnce", `Martha_2023_${clientUserId}.png`);
      let link = document.createElement("a");
      document.body.appendChild(link);
      link.href = uri;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    };
    const app = document.getElementById("app");
    const normalResultContainer = document.getElementById(
      "normal-result-container"
    );
    const hiddenResultContainer = document.getElementById(
      "hidden-result-container"
    );
    const imageContainer = document.getElementById("image-container");
    const textContainer = document.getElementById("text-container");

    if (app) {
      app.setAttribute(
        "style",
        "background-color: transparent !important; height: 100% !important;"
      );
      normalResultContainer?.setAttribute("style", "height: fit-content;");
      hiddenResultContainer?.setAttribute("style", "height: fit-content;");
      textContainer?.setAttribute("style", "height: fit-content");
      imageContainer?.setAttribute("style", "visibility: hidden;");

      html2canvas(app, { useCORS: true }).then((canvas) => {
        onSaveAs(
          canvas.toDataURL("image/png"),
          `Martha_2023_${clientUserId}.png`
        );
        app.setAttribute("style", "");
        normalResultContainer?.setAttribute("style", "");
        hiddenResultContainer?.setAttribute("style", "");
        textContainer?.setAttribute("style", "");
        imageContainer?.setAttribute("style", "");
      });
    }
  };

  const disablePathChange = pathname === "/playing";
  const isResult =
    pathname === "/normal-result" || pathname === "/hidden-result";
  const jobSelected = pathname === "/jobselect";

  const clientUserId = localStorage.getItem("userId");
  const capturedOnce = localStorage.getItem("capturedOnce");
  useEffect(() => {
    if (!clientUserId) localStorage.setItem("userId", nanoid());
  }, [clientUserId]);

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

  const isMain = pathname === "/";

  return (
    <>
      <div
        data-html2canvas-ignore="true"
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
              margin-left: ${isMain ? "0" : "16px"};
              &:active {
                opacity: 0.7;
              }
            `}
            alt="nextButton"
            onClick={() => {
              if (jobSelected) {
                handleSelect();
                handleNextClick();
              } else if (isResult) {
                handleCapture();
              } else {
                handleNextClick();
              }
            }}
            {...others}
          />
        )}
        {instructionText && <h1 css={headerTextStyle}>{instructionText}</h1>}
      </div>
      {showLogoTransition && <LogoTransition />}
    </>
  );
};

export default BottomButton;
