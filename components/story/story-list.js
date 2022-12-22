import StoryItem from "./story-item";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import React, { useEffect, useState } from "react";
import "pure-react-carousel/dist/react-carousel.es.css";

const DUMMY_STORY = [
  { id: "s1", name: "javad", image: "images/story-image/image-1.jfif" },
  { id: "s2", name: "reza23", image: "images/story-image/image-2.jfif" },
  { id: "s3", name: "Ali_love", image: "images/story-image/image-3.jfif" },
  { id: "s4", name: "Hossein_eblis", image: "images/story-image/image-4.jfif" },
  { id: "s5", name: "kazem24", image: "images/story-image/image-5.jfif" },
  { id: "s6", name: "javad_ng", image: "images/story-image/image-6.jfif" },
  { id: "s7", name: "mohammag_reza", image: "images/story-image/image-7.jfif" },
  { id: "s8", name: "jabar_sing", image: "images/story-image/image-8.jfif" },
];

const StoryList = props => {
  const [isBrowser, setIsBrowser] = useState(false);

  let visibleSlides = 5;

  useEffect(() => {
    setIsBrowser(true);
  }, [setIsBrowser]);

  if (isBrowser) {
    const win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName("body")[0],
      x = win.innerWidth || docElem.clientWidth || body.clientWidth;
    // y = win.innerHeight || docElem.clientHeight || body.clientHeight;

    if (Math.floor(x / 80) < 8) {
      visibleSlides = Math.floor(x / 80);
    }
  }

  const stories = DUMMY_STORY.map((story, index) => (
    <Slide index={index} key={story.id}>
      <StoryItem key={story.id} name={story.name} image={story.image} />
    </Slide>
  ));

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={150}
      totalSlides={DUMMY_STORY.length + 1}
      visibleSlides={visibleSlides}
      className="bg-white h-24 md:h-28 py-2 shadow-around rounded-md overflow-hidden"
    >
      <Slider dir="ltr" className="text-[10px] md:text-[13px]">
        {stories}
      </Slider>
    </CarouselProvider>
  );
};

export default StoryList;
