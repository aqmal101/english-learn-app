// TappingImage.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import interact from "interactjs";

const TappingImage = ({
  src,
  alt = "Interactive image",
  tapAreas = [],
  onTap = () => {},
  showHints = false,
  width = "100%",
  height = "auto",
  className = "",
}) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [tappedAreas, setTappedAreas] = useState([]);

  // Set up container size observer
  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      resizeObserver.observe(containerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Handle image load to get natural dimensions
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
      setImageLoaded(true);
    }
  };

  // Set up interaction with the image
  useEffect(() => {
    if (imageRef.current && imageLoaded) {
      const listener = (event) => {
        // Get the click position relative to the image
        const rect = imageRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Convert to percentage of image dimensions
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Check if the click is within any defined tap areas
        let tapped = false;
        tapAreas.forEach((area) => {
          const {
            x: areaX,
            y: areaY,
            width: areaWidth,
            height: areaHeight,
            id,
          } = area;

          if (
            xPercent >= areaX &&
            xPercent <= areaX + areaWidth &&
            yPercent >= areaY &&
            yPercent <= areaY + areaHeight
          ) {
            tapped = true;

            // Only add to tapped areas if not already tapped
            if (!tappedAreas.includes(id)) {
              setTappedAreas((prev) => [...prev, id]);
            }

            // Call the onTap callback with the area information
            onTap({ ...area, event });
          }
        });

        return tapped;
      };

      // Use interact.js to add tap event
      const interactable = interact(imageRef.current).on("tap", (event) => {
        listener(event);
      });

      return () => {
        interactable.unset();
      };
    }
  }, [imageLoaded, tapAreas, onTap, containerSize, imageSize, tappedAreas]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width, height }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className="w-full h-full object-contain"
        style={{ cursor: "pointer" }}
      />

      {showHints &&
        imageLoaded &&
        tapAreas.map((area) => {
          const isAlreadyTapped = tappedAreas.includes(area.id);
          return (
            <div
              key={area.id}
              className={`absolute border-2 rounded-md transition-all ${
                isAlreadyTapped
                  ? "border-green-500 bg-transparent bg-opacity-30"
                  : "border-dashed border-red-500 bg-blue-100/40 bg-opacity-20"
              }`}
              style={{
                left: `${area.x}%`,
                top: `${area.y}%`,
                width: `${area.width}%`,
                height: `${area.height}%`,
                pointerEvents: "none",
              }}
            >
              {isAlreadyTapped && (
                <div className="absolute -top-6 left-0 bg-green-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  {area.label || area.id}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default TappingImage;
