import { css } from "@emotion/react";
import { jobNameList } from "./constants";
import { useJobSelectStore } from "./store";
import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";
const { VITE_SOCKET_SERVER_URL, VITE_FLASK_SERVER_URL } = import.meta.env;

const containerStyle = () => css`
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const jobSelectContainerStyle = () => css`
  width: 273px;
  height: 400px;
  @media (min-width: 420px) {
    height: 476px;
  }
  padding: 0 4px;
  position: relative;
  background-size: contain;
  background: linear-gradient(
    180deg,
    #e6f8ff 0%,
    #efecf3 13.02%,
    #fbf5fb 33.85%,
    #fff 50%,
    #fbf5fb 64.06%,
    #eaedf4 86.98%,
    #e6f8ff 100%
  );
  /* background-image: url("../../public/assets/svgs/select_container_bg.png"); */

  .picker-highlight {
    background-color: var(--martha-secondary-bg-color);
    border-radius: 20px;
    z-index: -1;
  }
  .picker-highlight::before,
  .picker-highlight::after {
    background-color: transparent;
    height: 0;
  }
  .picker-container {
    .picker-inner {
      -webkit-mask-box-image: unset;
      z-index: 0;
      .picker-column {
        .picker-scroller {
          .picker-item {
            cursor: pointer;
            color: var(--martha-secondary-color);
            font-size: 16px;
          }
          .picker-item-selected {
            color: white !important;
            font-size: 18px;
            -webkit-text-stroke-width: 0.3px;
            -webkit-text-stroke-color: var(--martha-secondary-bg-color);
          }
        }
      }
    }
  }
`;

export interface JobSelectProps {}
const JobSelect = (props: JobSelectProps) => {
  const {} = props;

  const { setSelectedJobInfo, selectedJobInfo, setJobList } =
    useJobSelectStore();

  const [selectedJobDict, setSelectedJobDict] = useState({
    selectedJob: "우주 엘리베이터 안내원",
    /**needed to init select */
    jobOptions: "우주 엘리베이터 안내원",
  });

  const jobOptionsDict = {
    jobOptions: jobNameList,
  };

  const handleChange = (name: string, value: string) => {
    setSelectedJobDict((prev) => {
      return {
        /**prev, [name]:value needed to be set for now */
        ...prev,
        [name]: value,
        selectedJob: value,
      };
    });

    setSelectedJobInfo(value);
    // Check if the `vibrate` function is available (ios not supported)
    if ("vibrate" in window.navigator) {
      // Trigger the haptic feedback for 200 milliseconds
      window.navigator.vibrate(200);
    }
  };

  useEffect(() => {
    /**needed to init store value */
    setSelectedJobInfo("우주 엘리베이터 안내원");
  }, []);

  useEffect(() => {
    const getJobList = async () => {
      try {
        const response = await fetch(`${VITE_FLASK_SERVER_URL}/job_list`);
        const jsonData = await response.json();
        setJobList(jsonData.jobList);
        setSelectedJobInfo(jsonData[13]?.jobName);
      } catch (error) {
        console.log("Error fetching jobList:", error);
      }
    };
    getJobList();
  }, []);

  return (
    <div css={containerStyle}>
      <div css={jobSelectContainerStyle}>
        <Picker
          wheel="off"
          optionGroups={jobOptionsDict}
          valueGroups={selectedJobDict}
          onChange={handleChange}
          // onClick={handleClick}
          height={476}
          itemHeight={37}
        />
      </div>
    </div>
  );
};

export default JobSelect;
