// TappingElement.jsx
"use client";

import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import getRandomColor from "../utils/getRandomColor";
import { LetterShape } from "./LetterShaped";

const TappingElement = ({
  elements = [],
  elementType = "letter", // "letter" or "image"
  appearInterval = 2000, // Time between new elements appearing (ms)
  disappearAfter = 10000, // Time until element disappears (ms)
  maxElements = 5, // Maximum number of elements visible at once
  width = "100%",
  height = "auto",
  backgroundImage = null,
  soundSrc = null,
  onTap = () => {},
  prompt = "Tap the letter that you see, hurry up!",
  onComplete = () => {},
}) => {
  const [visibleElements, setVisibleElements] = useState([]);
  const [tappedElements, setTappedElements] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(elements.length);
  const containerRef = useRef(null);
  const soundRef = useRef(null);
  const elementsRef = useRef(elements);
  const intervalRef = useRef(null);
  const checkDisappearIntervalRef = useRef(null);

  // Reset state when elements change (i.e., when navigating to a new page)
  useEffect(() => {
    // Check if elements array has changed
    const elementsChanged =
      JSON.stringify(elements) !== JSON.stringify(elementsRef.current);

    if (elementsChanged) {
      // Update ref to new elements
      elementsRef.current = elements;

      // Reset all states
      setVisibleElements([]);
      setTappedElements([]);
      setIsActive(true);
      setScore(0);
      setRemaining(elements.length);

      // Clear any running intervals
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (checkDisappearIntervalRef.current) {
        clearInterval(checkDisappearIntervalRef.current);
        checkDisappearIntervalRef.current = null;
      }
    }
  }, [elements]);

  // Initialize sound
  useEffect(() => {
    if (soundSrc && typeof Audio !== "undefined") {
      soundRef.current = new Audio(soundSrc);
    }
    return () => {
      if (soundRef.current) {
        soundRef.current.pause();
        soundRef.current = null;
      }
    };
  }, [soundSrc]);

  // Element appearance loop
  useEffect(() => {
    if (!isActive || elements.length === 0) return;

    // Function to add a new element at random position
    const addElement = () => {
      if (
        visibleElements.length >= maxElements ||
        tappedElements.length >= elements.length
      ) {
        return;
      }

      // Get container dimensions
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      // Find an element that hasn't been shown yet
      const availableElements = elements.filter(
        (el) =>
          !visibleElements.some((ve) => ve.id === el.id) &&
          !tappedElements.includes(el.id)
      );

      if (availableElements.length === 0) return;

      // Pick a random element
      const randomIndex = Math.floor(Math.random() * availableElements.length);
      const element = availableElements[randomIndex];

      // Generate random position within container bounds
      // Keep some margin from edges (10% of width/height)
      const marginX = containerWidth * 0.1;
      const marginY = containerHeight * 0.1;

      const x = marginX + Math.random() * (containerWidth - marginX * 2);
      const y = marginY + Math.random() * (containerHeight - marginY * 2);

      // Create the element object with position and timestamp
      const newElement = {
        ...element,
        x,
        y,
        timestamp: Date.now(),
        color: getRandomColor(),
      };

      // Add to visible elements
      setVisibleElements((prev) => [...prev, newElement]);
    };

    // Start adding elements
    intervalRef.current = setInterval(addElement, appearInterval);

    // Initial element
    addElement();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    elements,
    visibleElements,
    tappedElements,
    isActive,
    maxElements,
    appearInterval,
  ]);

  // Element disappearance loop
  useEffect(() => {
    if (!isActive) return;

    const checkDisappear = () => {
      const now = Date.now();

      setVisibleElements((prev) =>
        prev.filter((element) => now - element.timestamp < disappearAfter)
      );
    };

    checkDisappearIntervalRef.current = setInterval(checkDisappear, 1000);

    return () => {
      if (checkDisappearIntervalRef.current) {
        clearInterval(checkDisappearIntervalRef.current);
        checkDisappearIntervalRef.current = null;
      }
    };
  }, [isActive, disappearAfter]);

  // Clean up intervals when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (checkDisappearIntervalRef.current) {
        clearInterval(checkDisappearIntervalRef.current);
      }
    };
  }, []);

  // Check if all elements have been tapped
  useEffect(() => {
    if (tappedElements.length === elements.length && elements.length > 0) {
      setIsActive(false);
      onComplete();
    }
  }, [tappedElements, elements, onComplete]);

  // Handle tapping on an element
  const handleTap = (element) => {
    // Play sound
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
    }

    // Remove the element from visible elements
    setVisibleElements((prev) => prev.filter((e) => e.id !== element.id));

    // Add to tapped elements
    if (!tappedElements.includes(element.id)) {
      setTappedElements((prev) => [...prev, element.id]);
      setScore((prev) => prev + 1);
      setRemaining((prev) => prev - 1);
    }

    // Call the onTap callback
    onTap(element);
  };

  return (
    <div className="w-full h-full flex flex-col-reverse">
      {/* Instruction prompt */}
      <div className="bg-amber-100 p-2 rounded-md my-2 flex justify-between text-xs text-amber-700">
        <span>
          Tapped: {score} / {elements.length}
        </span>
        <p className="text-sm font-medium text-amber-800">{prompt}</p>
        <span>Remaining: {remaining}</span>
      </div>

      {/* Container for the elements */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden rounded-lg"
        style={{
          width,
          height,
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* If no background image, add a light background */}
        {!backgroundImage && (
          <div className="absolute inset-0 bg-amber-50"></div>
        )}

        {/* Render visible elements */}
        <AnimatePresence>
          {visibleElements.map((element) => (
            <motion.div
              key={element.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className="absolute cursor-pointer"
              style={{
                left: element.x,
                top: element.y,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleTap(element)}
            >
              {elementType === "letter" ? (
                <LetterShape
                  char={element.content}
                  color={element.color} // random color sebelumnya
                  size={64} // atau ukuran apa pun yang kamu mau
                />
              ) : (
                <img
                  src={element.content}
                  alt={element.id}
                  className="w-12 h-12 object-contain hover:scale-110 transition-transform"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Completion message */}
        {tappedElements.length === elements.length && elements.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-20 rounded-lg">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-amber-800">Great job!</h3>
              <p className="text-amber-700">You tapped all the letters!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TappingElement;
