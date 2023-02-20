import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

interface Props {
  urls: string[];
}

const Slider = ({ urls }: Props) => {
  return (
    <div className="slide-container">
      <Slide indicators={true} canSwipe={true} arrows={false}>
        {urls.map((url, index) => (
          <div
            key={index}
            className="w-full rounded-xl shadow-xl aspect-[16/9] min-h-[240px] max-h-[480px]"
            style={{
              background: `url(${url}) center no-repeat`,
              backgroundSize: "cover",
            }}
          />
        ))}
      </Slide>
    </div>
  );
};

export default Slider;
