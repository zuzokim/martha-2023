import { css } from "@emotion/react";
import Haemonging from "./Haemonging";
import { useEffect, useState } from "react";

const normalResultContainerStyle = () => css`
  height: 55vh;
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
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0.125;
  color: var(--martha-secondary-color);
  padding: 0px 20px 0px 30px;
  white-space: pre-wrap;
`;

export interface NormalResultProps {}
const NormalResult = (props: NormalResultProps) => {
  const userId = localStorage.getItem("userId");
  const [resultData, setResultData] = useState<any | null>(null);
  const [haemongDone, setHaemongDone] = useState(false);

  async function getNormalResult() {
    try {
      const waitForHaemonging = await fetch(
        `http://192.168.0.36:5000/waitfor_result?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(waitForHaemonging, "waitForHaemonging");
      const waitForResult = await waitForHaemonging.json();

      setHaemongDone(Boolean(waitForResult));

      if (Boolean(waitForHaemonging)) {
        const response = await fetch(
          `http://192.168.0.36:5000/result?userId=${userId}`,
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
    getNormalResult();
  }, []);

  return (
    <div>
      <div css={normalResultContainerStyle} id="normal-result-container">
        <div css={textContainerStyle}>
          <p css={textStyle}>{resultData?.normalResult?.generatedText}</p>
        </div>
      </div>
      <Haemonging haemongDone={haemongDone} />
    </div>
  );
};

export default NormalResult;
