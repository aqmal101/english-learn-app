"use client";

import { useEffect, useRef, useState } from "react";
import interact from "interactjs";

const DragDropComponent = ({
  words,
  dropZones,
  backgroundImage,
  onComplete,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [droppedItems, setDroppedItems] = useState({});
  const [feedback, setFeedback] = useState("");
  const containerRef = useRef(null);
  const dropZonesRef = useRef([]);
  const draggablesRef = useRef([]);

  // Reset and initialize the drag-drop functionality
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous drop zones
    dropZonesRef.current.forEach((zone) => {
      if (zone && zone.parentNode) {
        zone.parentNode.removeChild(zone);
      }
    });
    dropZonesRef.current = [];

    // Create drop zones
    dropZones.forEach((zone) => {
      const element = document.createElement("div");
      element.id = `drop-${zone.id}`;
      element.className = "drop-zone";
      element.style.position = "absolute";
      element.style.left = `${zone.x}px`;
      element.style.top = `${zone.y}px`;
      element.style.width = `${zone.width}px`;
      element.style.height = `${zone.height}px`;
      element.style.border = "2px dashed rgba(255, 255, 255, 0.6)";
      element.style.borderRadius = "8px";
      element.style.display = "flex";
      element.style.alignItems = "center";
      element.style.justifyContent = "center";
      element.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
      element.style.zIndex = "1";
      element.setAttribute("data-label", zone.label);

      // Add label for debugging (can be removed in production)
      // const label = document.createElement("span");
      // label.textContent = zone.label;
      // label.style.color = "rgba(255, 255, 255, 0.7)";
      // label.style.fontSize = "12px";
      // element.appendChild(label);

      containerRef.current.appendChild(element);
      dropZonesRef.current.push(element);
    });

    // Setup draggables
    const draggableElements = document.querySelectorAll(".draggable");
    draggablesRef.current = Array.from(draggableElements);

    // Initialize interactjs for draggables
    draggablesRef.current.forEach((dragElement) => {
      interact(dragElement).draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: containerRef.current.parentElement,
            endOnly: true,
          }),
        ],
        autoScroll: true,
        listeners: {
          start(event) {
            event.target.classList.add("dragging");
          },
          move(event) {
            const target = event.target;
            const x =
              (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            const y =
              (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
          },
          end(event) {
            event.target.classList.remove("dragging");
          },
        },
      });
    });

    // Initialize interactjs for dropzones
    dropZonesRef.current.forEach((dropzone) => {
      interact(dropzone).dropzone({
        accept: ".draggable",
        overlap: 0.4,
        ondragenter: function (event) {
          event.target.classList.add("drop-active");
        },
        ondragleave: function (event) {
          event.target.classList.remove("drop-active");
        },
        ondrop: function (event) {
          const draggableElement = event.relatedTarget;
          const dropzoneElement = event.target;
          const draggableWord = draggableElement.textContent.trim();
          const correctWord = dropzoneElement.getAttribute("data-label");

          // Debug info (can be removed in production)
          // console.log("Dropped:", draggableWord, "onto", correctWord);

          if (draggableWord.toLowerCase() === correctWord.toLowerCase()) {
            // Position the draggable in the center of the dropzone
            const dropRect = dropzoneElement.getBoundingClientRect();
            const dragRect = draggableElement.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const centerX =
              dropRect.left -
              containerRect.left +
              dropRect.width / 2 -
              dragRect.width / 2;
            const centerY =
              dropRect.top -
              containerRect.top +
              dropRect.height / 2 -
              dragRect.height / 2;

            draggableElement.style.transform = `translate(${centerX}px, ${centerY}px)`;
            draggableElement.setAttribute("data-x", centerX);
            draggableElement.setAttribute("data-y", centerY);

            // Mark as placed
            draggableElement.classList.add("placed");

            // Disable further dragging
            interact(draggableElement).unset();

            // Success feedback
            setFeedback("Correct! Good job!");
            setTimeout(() => setFeedback(""), 1500);

            // Update state
            setDroppedItems((prev) => {
              const newDroppedItems = {
                ...prev,
                [correctWord]: true,
              };

              // Check if all words are placed
              if (Object.keys(newDroppedItems).length === words.length) {
                setTimeout(() => {
                  setFeedback("Amazing! You've placed all words correctly!");
                  if (onComplete) onComplete();
                }, 300);
              }

              return newDroppedItems;
            });
          } else {
            // Reset position if incorrect
            draggableElement.style.transform = `translate(0px, 0px)`;
            draggableElement.setAttribute("data-x", 0);
            draggableElement.setAttribute("data-y", 0);

            // Error feedback
            setFeedback("Try again! That's not the right place.");
            setTimeout(() => setFeedback(""), 1500);
          }

          event.target.classList.remove("drop-active");
        },
      });
    });

    return () => {
      // Cleanup
      draggablesRef.current.forEach((el) => {
        if (el) interact(el).unset();
      });

      dropZonesRef.current.forEach((el) => {
        if (el) interact(el).unset();
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, [words, dropZones, onComplete]); // Important to only run this effect when these values change

  return (
    <div className="flex flex-col h-full">
      {/* Interactive area with background image */}
      <div className="flex-1 relative rounded-lg overflow-hidden border border-amber-300">
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${
              backgroundImage || "/api/placeholder/600/400"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Drop zones will be created dynamically here */}
        </div>
      </div>

      {/* Word bank at the bottom */}
      <div className="mt-2 p-2 bg-white border border-dashed border-amber-600 rounded-lg">
        <div className="flex flex-wrap gap-2 justify-center">
          {words.map((word, index) => (
            <div
              key={index}
              className="draggable bg-amber-500 text-white px-3 py-1 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:bg-amber-600 transition-colors text-sm"
              data-x="0"
              data-y="0"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      {feedback && (
        <div
          className={`mt-2 p-1 absolute right-1/4 left-1/4 rounded-md text-center font-medium text-sm ${
            feedback.includes("Correct") || feedback.includes("Amazing")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default DragDropComponent;
