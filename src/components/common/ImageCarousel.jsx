import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

const ImageCarousel = ({ images = [], size = 64 }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="carousel-placeholder" style={{ width: size, height: size }}>
        <ImageOff size={20} />
      </div>
    );
  }

  const prev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="carousel" style={{ width: size, height: size }}>
      <img src={images[index]} alt={`thumbnail ${index + 1}`} className="carousel-img" />
      {images.length > 1 && (
        <>
          <button className="carousel-arrow left" onClick={prev} type="button">
            <ChevronLeft size={13} />
          </button>
          <button className="carousel-arrow right" onClick={next} type="button">
            <ChevronRight size={13} />
          </button>
          <span className="carousel-count">{index + 1}/{images.length}</span>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
