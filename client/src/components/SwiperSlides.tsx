import { SwiperSlide } from "swiper/react";
import Main from "./Main";
import { NavigationType } from "./Main";

export interface SwiperSlidesProps {
  onClick: (navigationType: NavigationType) => void;
  slideType: NavigationType;
}

const SwiperSlides = (props: SwiperSlidesProps) => {
  const { onClick, slideType } = props;


  return <div>asdfas</div>;
  //   return (
  //     <>
  //       <SwiperSlide>
  //         <Main onClick={onClick} />
  //       </SwiperSlide>
  //       <SwiperSlide>
  //         {slideType === "PLAY" ? <div>play</div> : <div>intro</div>}
  //       </SwiperSlide>
  //       <SwiperSlide>Slide 3</SwiperSlide>
  //       <SwiperSlide>Slide 4</SwiperSlide>
  //       <SwiperSlide>Slide 5</SwiperSlide>
  //     </>
  //   );
};

export default SwiperSlides;
