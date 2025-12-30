import React, { useState } from "react";
import "../CSS/Gallary.css";
import Navbar from "../Components/Navbar";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    title: "Goa",
    category: "India"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    title: "Paris",
    category: "France"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=900&q=80",
    title: "Maldives",
    category: "Maldives"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    title: "Dubai",
    category: "Dubai"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=80",
    title: "Kerala",
    category: "India"
  }
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("India");
  const [startX, setStartX] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  // Category click
  const goToCategory = (category) => {
    const foundIndex = images.findIndex(
      (img) => img.category === category
    );

    if (foundIndex !== -1) {
      setIndex(foundIndex);
      setActiveCategory(category);
    }
  };

  // Prev / Next
  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <>
      <Navbar />

      <div className="gallery-wrapper">
        <h2 className="heading">See the world through our lens</h2>

        {/* Category Pills */}
        <div className="categories">
          {["India", "Dubai", "France", "Maldives"].map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? "active" : ""}
              onClick={() => goToCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div
          className="slider"
          onTouchStart={(e) => setStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) next();
            if (endX - startX > 50) prev();
          }}
        >
          {images.map((img, i) => {
            let position = "hidden";

            if (i === index) position = "active";
            else if (
              i === index - 1 ||
              (index === 0 && i === images.length - 1)
            )
              position = "left";
            else if (
              i === index + 1 ||
              (index === images.length - 1 && i === 0)
            )
              position = "right";

            return (
              <div
                key={img.id}
                className={`card ${position}`}
                onClick={() => position === "active" && setSelectedImg(img)}
              >
                <img src={img.src} alt={img.title} />
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="controls">
          <button onClick={prev}>←</button>
          <button onClick={next}>→</button>
        </div>

        {/* FULL IMAGE MODAL */}
        {selectedImg && (
          <div
            className="image-modal"
            onClick={() => setSelectedImg(null)}
          >
            <div
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedImg(null)}
              >
                ✕
              </button>
              <img src={selectedImg.src} alt={selectedImg.title} />
              <h3>{selectedImg.title}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
