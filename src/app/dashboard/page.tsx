"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const [input, setInput] = useState<number | null>(null);
  let sliderRef = useRef(null);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    vertical: true,
    verticalSwiping: true,
  };

  useEffect(() => {
    // @ts-ignore
    sliderRef.slickGoTo(input);
  }, [input]);
  return (
    <div className="flex items-center justify-center">
      <input
        className="border-4"
        onChange={(e) => setInput(parseInt(e.target.value))}
      />
      <Slider
        ref={(slider) => {
          // @ts-ignore
          sliderRef = slider;
        }}
        {...settings}
      >
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}
