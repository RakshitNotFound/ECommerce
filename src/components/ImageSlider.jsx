import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";
import "../componentsCSS/imageSlider.css";

const slideImage = [
  {
    url: "https://www.boat-lifestyle.com/cdn/shop/files/IMG_0909_1440x.jpg?v=1693583898",
  },
  {
    url: "https://www.titan.co.in/wps/wcm/connect/titanrt/652956d7-5071-4450-ba3e-92f1e96b6614/desktop/TD_Latest_trend_210823_espot.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_90IA1H80OGR2D068O7K5LN3O26-652956d7-5071-4450-ba3e-92f1e96b6614-desktop-oEoTVUt",
  },
  {
    url: "https://appleshopuganda.com/wp-content/uploads/2021/07/Apple-iPhone-12-Pro-Banner-Prelim.jpg",
  },
];

const divStyle = {
  display: "flex",
  alignItem: "center",
  justifyContent: "center",
  height: "350px",
  backgroundSize: "1600px 350px",
  width: "100%",
};

const ImageSlider = () => {
  return (
    <div className="slide-container" style={{ zIndex: "0" }}>
      <Fade>
        {slideImage.map((image, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${image.url})`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default ImageSlider;
