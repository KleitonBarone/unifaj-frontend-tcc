import React, { useState } from "react";
import "./Carousel.css";
import { images } from "components/Helpers/CarouselData";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const delay = 3500;

function Carousel() {
  const [currImg, setCurrImg] = useState(0);

  // const [index, setCurrImg] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrImg((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [currImg]);



  return (
    <div className="carousel">
      <div
        className="carouselInner"
        style={{ backgroundImage: `url(${images[currImg].img})` }}
 
      >
        <div
          className="left"
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
            currImg == 0 && setCurrImg(images.length - 1);
          }}
        >
          <ArrowBackIosIcon style={{ fontSize: 22 }} />
        </div>
        <div className="center CarouselText">
          <h1 className="CarouselText">{images[currImg].title}</h1>
          <p className="CarouselText">{images[currImg].subtitle}</p>

          <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${currImg === idx ? " active" : ""}`}
            onClick={() => {
              setCurrImg(idx);
            }}
          ></div>
        ))}
      </div>
        </div>
        <div
          className="right"
          onClick={() => {
            currImg < images.length - 1 && setCurrImg(currImg + 1);
            currImg == images.length - 1 && setCurrImg(0);
          }}
        >
          <ArrowForwardIosIcon style={{ fontSize: 22 }} />
        </div>
        
      

      </div>
    </div>
  );
}

export default Carousel;
