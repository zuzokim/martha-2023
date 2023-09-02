import { css } from "@emotion/react";
import { jobNameList } from "./constants";
import { useLocation } from "react-router-dom";
import { useJobSelectStore } from "./store";
import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";

const containerStyle = () => css`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const jobSelectContainerStyle = () => css`
  width: 273px;
  height: 476px;
  padding: 0 4px;
  position: relative;
  background-size: contain;
  background-image: url("../../public/assets/svgs/select_container_bg.png");

  .picker-highlight {
    background-color: var(--martha-secondary-bg-color);
    border-radius: 20px;
    z-index: -1;
  }
  .picker-highlight::before,
  .picker-highlight::after {
    background-color: transparent;
  }
  .picker-container {
    .picker-inner {
      .picker-column {
        .picker-scroller {
          .picker-item {
            cursor: pointer;
            color: var(--martha-secondary-color);
            font-size: 17px;
          }
          .picker-item-selected {
            color: white !important;
            font-size: 18px;
            -webkit-text-stroke-width: 0.3px;
            -webkit-text-stroke-color: white;
          }
        }
      }
    }
  }
`;

export interface JobSelectProps {}
const JobSelect = (props: JobSelectProps) => {
  const {} = props;

  const location = useLocation();
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
    const clientUserId = localStorage.getItem("userId") ?? "";
    const getJobList = async () => {
      try {
        const response = await fetch("http://192.168.0.36:5000/job_list");
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
          // wheel="natural"
          optionGroups={jobOptionsDict}
          valueGroups={selectedJobDict}
          onChange={handleChange}
          // onClick={handleClick}
          height={476}
          itemHeight={44}
        />
      </div>
    </div>
  );
};

export default JobSelect;
