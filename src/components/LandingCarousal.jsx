import React, { useState, useEffect } from "react";
import "../css/LandingCarousal.css";
import { CircularProgress } from "@mui/material";
const carousalData = [
  {
    image:
      "https://res.cloudinary.com/dg5dkcpkn/image/upload/v1693288332/lqojfz3kdgjgk3ufpdfa.jpg",
    heading: "",
    para: "",
  },
  {
    image:
      "https://res.cloudinary.com/dg5dkcpkn/image/upload/v1693292014/ebbk0kkna8wvvm6ajysj.jpg",
    heading: "",
    para: "",
  },
  {
    image:
      "https://res.cloudinary.com/dg5dkcpkn/image/upload/v1693288332/z9g7rpj8ddmmfuyurfwn.jpg",
    heading: "",
    para: "",
  },
  {
    image:
      "https://res.cloudinary.com/dg5dkcpkn/image/upload/v1693288332/a1aleqataokwjnzp2ua2.jpg",
    heading: "",
    para: "",
  },
  {
    image:
      "https://res.cloudinary.com/dg5dkcpkn/image/upload/v1693288332/zn8fne4kchxjkmghai1l.jpg",
    heading: "",
    para: "",
  },
  {
    image:
      "https://res.cloudinary.com/dg5dkcpkn/image/upload/v1693288331/nvmspnna9rszpq4sq0ex.jpg",
    heading: "",
    para: "",
  },
  {
    image:
      "https://res.cloudinary.com/dg5dkcpkn/image/upload/v1693288334/hg3vbjtsbqqwxbra8cx6.jpg",
    heading: "",
    para: "",
  },
  {
    image:
      "https://res.cloudinary.com/dg5dkcpkn/image/upload/v1693288333/nrpuksyfgfqxwjtkixrv.jpg",
    heading: "",
    para: "",
  },
];

const LandingCarousal = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const imagePromises = carousalData.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = slide.image;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(false));
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % carousalData.length);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [imagesLoaded]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  if (!imagesLoaded) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="landing-carousal">
      {carousalData.map((slide, index) => (
        <div
          key={index}
          className={`slide-section ${index === activeIndex ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="content">
            <h2>{slide.heading}</h2>
            <p>{slide.para}</p>
          </div>
        </div>
      ))}
      <div className="dots">
        {carousalData.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LandingCarousal;
