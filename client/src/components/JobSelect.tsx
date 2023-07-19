import { css } from "@emotion/react";
import { jobNameList } from "./constants";
import JobSelectHeader from "./JobSelectHeader";
import { useLocation } from "react-router-dom";
import { useJobSelectStore, usePathStore } from "./store";
import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";

const containerStyle = () => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
  gap: 24px;
  padding: 0 40px 40px 40px;
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
  const { setPath } = usePathStore();
  const { setSelectedJobInfo, selectedJobInfo, setJobList } =
    useJobSelectStore();

  console.log(selectedJobInfo, "selectedJobInfo");

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
    console.log(value);
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
        const response = await fetch("http://127.0.0.1:5000/job_list");
        const jsonData = await response.json();
        setJobList(jsonData);
        setSelectedJobInfo(jsonData[13].jobName);
      } catch (error) {
        console.log("Error fetching jobList:", error);
      }
    };
    getJobList();
  }, []);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname, setPath]);

  return (
    <div css={containerStyle}>
      <JobSelectHeader />
      <div css={jobSelectContainerStyle}>
        <Picker
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
