import { css } from "@emotion/react";

import { ReactComponent as JobSelectTitle } from "../../public/assets/svgs/job_select_title.svg";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { introText, jobList } from "./constants";
import { connect } from "socket.io-client";

const containerStyle = () => css`
  display: flex;
  flex-direction: column;
  gap: 52px;
  align-items: center;
`;

const jobSelectContainerStyle = () => css`
  width: 290px;
  height: 530px;
  padding: 20px;
  overflow: scroll;
  background-color: lightgray;
`;

export type NavigationType = "PLAY" | "INTRO";

export interface JobSelectProps {
  onSelect: (navigationType: NavigationType) => void;
}
const JobSelect = (props: JobSelectProps) => {
  const { onSelect } = props;

  const URL = `http://localhost:8000`;
  const socket = connect(URL, { autoConnect: false });

  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();
  // swiperSlide.isActive

  console.log(swiper.isEnd, swiper.activeIndex, swiper.fadeEffect);

  const handleClick = ({ jobType, job }: { jobType: string; job: string }) => {
    console.log(jobType, job);
    //TODO: fetch gpt server job
    //connect and send jobType to socket server :
    socket.emit("CreateMap", `${jobType}`);
  };

  return (
    <div css={containerStyle}>
      <JobSelectTitle />
      <div css={jobSelectContainerStyle}>
        <ol>
          {jobList.map((v, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick({ jobType: v.type, job: v.name })}
              >
                {v.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default JobSelect;
