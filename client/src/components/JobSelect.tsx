import { css } from "@emotion/react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { NavigationType, introText, jobList } from "./constants";
import { connect } from "socket.io-client";
import JobSelectHeader from "./JobSelectHeader";
import { useLocation } from "react-router-dom";
import { useJobSelectStore, usePathStore } from "./store";
import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";
import SelectContainerBg from "../../public/assets/svgs/select_container_bg.png";

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
            font-size: 14px;
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

  const URL = `http://localhost:8000`;
  const socket = connect(URL, { autoConnect: false });

  const handleClick = (name, value) => {
    // console.log(name, value, "onclick");
    // async ({ jobType, job }: { jobType: string; job: string }) => {
    //   console.log(jobType, job);
    //   //TODO: fetch gpt server
    //   const response = await fetch("http://localhost:5000/job_list");
    //   const jsonData = await response.json();
    //   console.log(jsonData, "data");
    //   //connect and send jobType to socket server :
    //   socket.emit("CreateMap", `${jobType}`);
    // };
  };

  // const handleClick = async ({
  //   jobType,
  //   job,
  // }: {
  //   jobType: string;
  //   job: string;
  // }) => {
  //   console.log(jobType, job);
  //   //TODO: fetch gpt server
  //   const response = await fetch("http://localhost:5000/job_list");
  //   const jsonData = await response.json();
  //   console.log(jsonData, "data");
  //   //connect and send jobType to socket server :
  //   socket.emit("CreateMap", `${jobType}`);
  // };

  const location = useLocation();
  const { setPath } = usePathStore();
  const { setSelectedJobInfo, selectedJobInfo } = useJobSelectStore();

  const [selectedJobDict, setSelectedJobDict] = useState({
    selectedJob: "크립토 생명체 사파리 가이드",
    /**needed to init select */
    jobOptions: "크립토 생명체 사파리 가이드",
  });

  const jobOptionsDict = {
    jobOptions: jobList.map((job) => job.jobName),
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
    setSelectedJobInfo("크립토 생명체 사파리 가이드");
  }, []);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname, setPath]);

  return (
    <div css={containerStyle}>
      <JobSelectHeader />
      <div css={jobSelectContainerStyle}>
        {/* <img
          src={SelectContainerBg}
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            height: 476px;
            display: block;
          `}
        /> */}
        <Picker
          optionGroups={jobOptionsDict}
          valueGroups={selectedJobDict}
          onChange={handleChange}
          onClick={handleClick}
          height={476}
          itemHeight={44}
        />
      </div>
    </div>
  );
};

export default JobSelect;

// <ol>
//   {jobList.map((v, index) => (
//     <li key={index}>
//       <button
//         onClick={() => handleClick({ jobType: v.type, job: v.name })}
//       >
//         {v.name}
//       </button>
//     </li>
//   ))}
// </ol>;