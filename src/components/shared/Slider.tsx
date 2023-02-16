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
            className="bg-cover rounded-xl shadow-xl h-[320px] sm:h-[360px] md:h-[420px] lg:h-[480px]"
            style={{
              background: `url(${url}) center center no-repeat`,
            }}
          />
        ))}
      </Slide>
    </div>
  );
};

export default Slider;
