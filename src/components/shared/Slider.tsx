import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

interface Props {
  urls: string[];
}

const Slider = ({ urls }: Props) => {
  return (
    <div className="slide-container">
      <Slide indicators={true} pauseOnHover={true}>
        {urls.map((url, index) => (
          <div
            key={index}
            className="bg-cover h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px]"
            style={{
              background: `url(${url}) center no-repeat`,
            }}
          />
        ))}
      </Slide>
    </div>
  );
};

export default Slider;
