"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  LibraryBig,
} from "lucide-react";
import DragDropComponent from "./DragDrop";
import TappingImage from "./TappingImage";
import TappingElement from "./TappingElement";
import storyBookData from "../dummy/bookData1.json";
import { useNavigate } from "react-router-dom";

export default function BookStory() {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState({});
  const [tappedElements, setTappedElements] = useState({});
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [tappedAreas, setTappedAreas] = useState({});
  const [showHints, setShowHints] = useState(false);

  const navigate = useNavigate();

  const handleRouteHome = () => {
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const handleRouteLibrary = () => {
    setTimeout(() => {
      navigate("/books");
    }, 1000);
  };

  // Handle tapping on elements (letters)
  const handleTapElement = (pageId, element) => {
    setTappedElements((prev) => {
      const newTapped = { ...prev };
      if (!newTapped[pageId]) {
        newTapped[pageId] = [];
      }
      if (!newTapped[pageId].includes(element.id)) {
        newTapped[pageId] = [...newTapped[pageId], element.id];
      }
      return newTapped;
    });
  };

  const handleTapArea = (pageId, area) => {
    setTappedAreas((prev) => {
      const newTapped = { ...prev };
      if (!newTapped[pageId]) {
        newTapped[pageId] = [];
      }
      if (!newTapped[pageId].includes(area.id)) {
        newTapped[pageId] = [...newTapped[pageId], area.id];
      }
      return newTapped;
    });
  };

  // Check if all elements for a page are completed
  useEffect(() => {
    Object.keys(tappedElements).forEach((pageId) => {
      const page = storyBookData.find((p) => p.id === pageId);
      if (
        page &&
        page.elements &&
        tappedElements[pageId]?.length === page.elements.length
      ) {
        handleActivityComplete(pageId);
      }
    });
  }, [tappedElements]);

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  useEffect(() => {
    Object.keys(tappedAreas).forEach((pageId) => {
      const page = storyBookData.find((p) => p.id === pageId);
      if (
        page &&
        page.tapAreas &&
        tappedAreas[pageId].length === page.tapAreas.length
      ) {
        handleActivityComplete(pageId);
      }
    });
  }, [tappedAreas]);

  const totalContentPages = storyBookData.length - 1;
  const totalSpreads = 1 + Math.ceil(totalContentPages / 2);

  const isCoverSpread = currentSpreadIndex === 0;
  const isFirstSpread = currentSpreadIndex === 0;
  const isLastSpread = currentSpreadIndex === totalSpreads - 1;

  const getCurrentPages = () => {
    if (isCoverSpread) return [storyBookData[0], null];

    const leftPageIndex = (currentSpreadIndex - 1) * 2 + 1;
    const rightPageIndex = leftPageIndex + 1;

    const leftPage = storyBookData[leftPageIndex] || null;
    const rightPage = storyBookData[rightPageIndex] || null;

    return [leftPage, rightPage];
  };

  const [leftPage, rightPage] = getCurrentPages();

  const goToNextSpread = () => {
    if (!isLastSpread) {
      setCurrentSpreadIndex(currentSpreadIndex + 1);
    }
  };

  const goToPrevSpread = () => {
    if (!isFirstSpread) {
      setCurrentSpreadIndex(currentSpreadIndex - 1);
    }
  };

  // Handle activity completion
  const handleActivityComplete = (pageId) => {
    setCompletedActivities((prev) => ({
      ...prev,
      [pageId]: true,
    }));
  };

  const renderPage = (page) => {
    if (!page) return <div className="flex-1 bg-amber-50"></div>;

    const isActivityCompleted = completedActivities[page.id];
    const pageTappedAreas = tappedAreas[page.id] || [];

    return (
      <div className="flex flex-1 flex-col p-6 w-full h-full overflow-hidden">
        {/* Page Number Badge */}
        {page.pageNumber && (
          <>
            <div className="absolute top-10 left-10 bg-amber-500 h-7 w-7 rounded-full flex justify-center items-center font-medium text-white text-sm z-10">
              {page.pageNumber}
            </div>
            {page.intruction && page.intruction.length > 0 && (
              <div
                onClick={() => setIsInfoOpen(!isInfoOpen)}
                className={`absolute space-x-2 top-10 right-10 bg-amber-500 h-7 w-fit  ${
                  isInfoOpen ? "px-2" : "px-1"
                } rounded-2xl flex justify-center items-center transition-all duration-100 ease-in-out font-medium text-white text-sm z-10`}
              >
                {isInfoOpen && <p>{page.intruction}</p>}
                <Info />
              </div>
            )}
          </>
        )}

        {/* Main content area - take most of the space but leave room for text */}
        <div className="relative flex-1 w-full h-4/5 overflow-hidden">
          {/* Show tapping letters if the page has that interaction */}
          {page.hasInteraction && page.interactionType === "tappingElement" ? (
            <div className="w-full h-full">
              <TappingElement
                elements={page.elements}
                elementType="letter"
                backgroundImage={page.image || "/api/placeholder/600/400"}
                soundSrc={page.soundSrc}
                onTap={(element) => handleTapElement(page.id, element)}
                prompt={page.interactionPrompt}
                onComplete={() => handleActivityComplete(page.id)}
                disappearAfter={10000}
                appearInterval={2000}
              />
            </div>
          ) : page.hasInteraction && page.interactionType === "tapping" ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 relative flex flex-col items-center justify-center">
                <TappingImage
                  src={page.image || "/api/placeholder/600/400"}
                  alt={`Illustration for page ${page.pageNumber}`}
                  tapAreas={page.tapAreas}
                  onTap={(area) => handleTapArea(page.id, area)}
                  showHints={showHints}
                  className="rounded-lg shadow-md"
                />
                <div className="w-full flex flex-row justify-between items-center mt-2 bg-amber-100 p-2 rounded">
                  <p className="text-xs text-amber-700">
                    Found: {pageTappedAreas.length} / {page.tapAreas.length}
                  </p>
                  <p className="text-sm font-medium text-amber-800">
                    {page.interactionPrompt}
                  </p>
                  <button
                    onClick={toggleHints}
                    className=" bg-amber-500 text-white px-2 py-1 text-xs rounded hover:bg-amber-600"
                  >
                    {showHints ? "Hide Hints" : "Show Hints"}
                  </button>
                </div>
              </div>
            </div>
          ) : page.hasActivity ? (
            <div className="w-full h-full bg-white">
              <DragDropComponent
                words={page.dragDropWords}
                dropZones={page.dropZones}
                backgroundImage={page.image || "/api/placeholder/600/400"}
                onComplete={() => handleActivityComplete(page.id)}
              />
            </div>
          ) : (
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
              <img
                src={page.image || "/api/placeholder/600/400"}
                alt={`Illustration for page ${page.pageNumber}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Completed message if activity is completed */}
          {(page.hasActivity ||
            (page.hasInteraction && page.interactionType === "tapping")) &&
            isActivityCompleted && (
              <div className="absolute mt-2 p-2 z-10 bottom-1 right-1/4 left-1/4 bg-green-100 text-green-800 rounded text-center">
                Great job! You've completed this activity!
              </div>
            )}
        </div>

        {/* Text Overlay at bottom */}
        <div className="mt-4 bg-amber-500/20 p-3 rounded">
          <p className="text-sm leading-relaxed">{page.content}</p>
        </div>
      </div>
    );
  };

  const renderCover = (cover) => {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-8 text-center p-6">
        <img
          src={cover.coverImage || "/api/placeholder/400/600"}
          alt="Book cover"
          className="h-2/3 rounded-lg shadow-lg object-cover"
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-amber-800">{cover.title}</h1>
          <p className="text-xl text-amber-600">by {cover.author}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full items-center justify-center bg-transparent p-4">
      <div className="relative h-full w-full max-w-8xl border border-amber-500 overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="relative h-[90%] overflow-hidden">
          {isCoverSpread ? (
            <div className="flex h-full justify-center items-center">
              {renderCover(leftPage)}
            </div>
          ) : (
            <div className="flex h-full border-b border-amber-200">
              <div className="flex-1 border-r border-amber-200 relative">
                {renderPage(leftPage)}
              </div>
              <div className="flex-1 relative">{renderPage(rightPage)}</div>
            </div>
          )}
        </div>

        <div className="flex h-[10%] items-center justify-between bg-amber-50 p-4">
          <button
            onClick={goToPrevSpread}
            disabled={isFirstSpread}
            className={`flex items-center rounded-full w-fit px-3 ${
              isFirstSpread
                ? "text-transparent"
                : "text-white bg-amber-500 hover:bg-amber-600"
            }`}
          >
            <ChevronLeft />
            <span>Previous</span>
          </button>

          <div className="flex items-center flex-row space-x-4">
            <button
              onClick={handleRouteHome}
              className="w-fit h-fit flex flex-row px-4 py-2 text-amber-600 border-2 border-amber-600 rounded-full cursor-pointer"
            >
              <Home /> Go Home
            </button>
            <span className="mr-3 text-amber-700">
              {isCoverSpread
                ? "Cover"
                : `Spread ${currentSpreadIndex} of ${totalSpreads - 1}`}
            </span>
            <button
              onClick={handleRouteLibrary}
              className="w-fit h-fit flex flex-row px-4 py-2 text-amber-600 border-2 border-amber-600 rounded-full cursor-pointer"
            >
              <LibraryBig /> All Books
            </button>
          </div>

          <button
            onClick={goToNextSpread}
            disabled={isLastSpread}
            className={`flex items-center rounded-full px-3 ${
              isLastSpread
                ? "text-transparent"
                : "text-white bg-amber-500 hover:bg-amber-600"
            }`}
          >
            <span>Next</span>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
