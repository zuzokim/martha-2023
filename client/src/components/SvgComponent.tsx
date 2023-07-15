import { HTMLAttributes } from "react";
export interface SvgComponentProps extends HTMLAttributes<HTMLImageElement> {
  alt: string;
  src: string;
  onClick?: () => void;
}
const SvgComponent = (props: SvgComponentProps) => {
  const { src, alt, onClick, ...others } = props;
  return <img src={src} alt={alt} onClick={onClick} {...others} />;
};

export default SvgComponent;
