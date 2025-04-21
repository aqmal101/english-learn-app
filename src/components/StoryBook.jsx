"use client";

import { useState, useEffect } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

// Story data structure
export const storyBookData = [
  {
    id: "cover",
    type: "cover",
    title: "The Little Adventure",
    author: "Jane Smith",
    coverImage: "https://random-image-pepebigotes.vercel.app/api/random-image",
    audio: "/story-audio-intro.mp3",
  },
  {
    id: "page-1",
    pageNumber: 1,
    content:
      "Once upon a time, there was a little rabbit named Hoppy. Hoppy lived in a cozy burrow at the edge of the Whispering Forest.",
    image: "https://random-image-pepebigotes.vercel.app/api/random-image",
    audio: "/story-audio-page1.mp3",
  },
  {
    id: "page-2",
    pageNumber: 2,
    content:
      "Every morning, Hoppy would wake up early to watch the sunrise. The golden light would filter through the trees, creating magical patterns on the forest floor.",
    image: "https://random-image-pepebigotes.vercel.app/api/random-image",
    audio: "/story-audio-page2.mp3",
  },
  {
    id: "page-3",
    pageNumber: 3,
    content:
      "One day, Hoppy discovered a mysterious path he had never seen before. It was lined with glowing blue flowers that seemed to whisper secrets.",
    image: "https://random-image-pepebigotes.vercel.app/api/random-image",
    audio: "/story-audio-page3.mp3",
  },
  {
    id: "page-4",
    pageNumber: 4,
    content:
      "Curious as always, Hoppy decided to follow the path. 'I wonder where this leads,' he thought, his heart beating with excitement.",
    image: "https://random-image-pepebigotes.vercel.app/api/random-image",
    audio: "/story-audio-page4.mp3",
  },
  {
    id: "page-5",
    pageNumber: 5,
    content:
      "The path led to a clearing where a group of animals were having a celebration. There were squirrels, birds, foxes, and even a wise old owl.",
    image: "https://random-image-pepebigotes.vercel.app/api/random-image",
    audio: "/story-audio-page5.mp3",
  },
  {
    id: "page-6",
    pageNumber: 6,
    content:
      "'Welcome, Hoppy!' said the owl. 'We've been waiting for you. Today is the annual Forest Festival, and you're our guest of honor.'",
    image: "https://random-image-pepebigotes.vercel.app/api/random-image",
    audio: "/story-audio-page6.mp3",
  },
  {
    id: "page-7",
    pageNumber: 7,
    content:
      "Hoppy was surprised. 'Me? But why?' The owl smiled wisely. 'Because you always appreciate the beauty of our forest. Your kind heart has been noticed by all.'",
    image: "https://random-image-pepebigotes.vercel.app/api/random-image",
    audio: "/story-audio-page7.mp3",
  },
  {
    id: "page-8",
    pageNumber: 8,
    content:
      "That day, Hoppy danced, sang, and made new friends. As the sun set, the forest glowed with fireflies, making it the most magical evening of Hoppy's life.",
    image: "https://random-image-pepebigotes.vercel.app/api/random-image",
    audio: "/story-audio-page8.mp3",
  },
];

export default function BookStory() {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

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

  const getCurrentAudio = () => {
    if (isCoverSpread) {
      return storyBookData[0].audio;
    }
    return leftPage?.audio || "";
  };

  const currentAudio = getCurrentAudio();

  const goToNextSpread = () => {
    if (!isLastSpread) {
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
      setCurrentSpreadIndex(currentSpreadIndex + 1);
    }
  };

  const goToPrevSpread = () => {
    if (!isFirstSpread) {
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
      setCurrentSpreadIndex(currentSpreadIndex - 1);
    }
  };

  const toggleAudio = () => {
    if (!audio || audio.src !== currentAudio) {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(currentAudio);
      newAudio.onended = () => setIsPlaying(false);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audio && audio.src !== currentAudio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentSpreadIndex, audio, currentAudio]);

  const renderPage = (page) => {
    if (!page) return <div className="flex-1 bg-amber-50"></div>;

    return (
      <div className="flex flex-1 flex-col p-6 w-full">
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-md">
          {/* Image */}
          <img
            src={page.image || "/placeholder.svg"}
            alt={`Illustration for page ${page.pageNumber || "cover"}`}
            className="w-full h-full object-cover"
          />

          {/* Page Number Badge */}
          {page.pageNumber && (
            <div className="absolute top-6 left-6  bg-amber-500 h-7 w-7 rounded-full flex justify-center items-center font-medium text-white text-sm">
              {page.pageNumber}
            </div>
          )}

          {/* Text Overlay */}
          <p className="absolute left-6 bottom-6  right-6 text-base leading-relaxed text-white bg-amber-500/20 p-3 rounded">
            {page.content}
          </p>
        </div>
      </div>
    );
  };

  const renderCover = (cover) => {
    return (
      <div className="flex h-full  flex-col items-center justify-center space-y-8 text-center p-6">
        <img
          src={cover.coverImage || "/placeholder.svg"}
          alt="Book cover"
          width={300}
          className="h-full rounded-lg shadow-lg object-cover"
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-amber-800">{cover.title}</h1>
          <p className="text-xl text-amber-600">by {cover.author}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full items-center justify-center bg-transparent border border-red-500">
      <div className="relative h-full w-full max-w-5xl border border-purple-500 overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="relative h-[90%]">
          {isCoverSpread ? (
            <div className="flex h-full justify-center items-center">
              {renderCover(leftPage)}
            </div>
          ) : (
            <div className="flex h-full border-b border-amber-200">
              <div className="flex-1 border-r border-amber-200">
                {renderPage(leftPage)}
              </div>
              <div className="flex-1">{renderPage(rightPage)}</div>
            </div>
          )}
        </div>

        <div className="flex h-[10%] items-center justify-between bg-amber-50 p-4">
          <button
            onClick={goToPrevSpread}
            disabled={isFirstSpread}
            className={`flex items-center rounded-full p-2 ${
              isFirstSpread
                ? "text-transparent"
                : "text-amber-600 hover:bg-amber-100"
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="ml-1">Previous</span>
          </button>

          <div className="flex items-center">
            <span className="mr-3 text-amber-700">
              {isCoverSpread
                ? "Cover"
                : `Spread ${currentSpreadIndex} of ${totalSpreads - 1}`}
            </span>
            <button
              onClick={toggleAudio}
              className="flex items-center rounded-full bg-amber-500 p-2 text-white hover:bg-amber-600"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5" />
                  <span className="ml-1">Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span className="ml-1">Listen</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={goToNextSpread}
            disabled={isLastSpread}
            className={`flex items-center rounded-full p-2 ${
              isLastSpread
                ? "text-transparent"
                : "text-amber-600 hover:bg-amber-100"
            }`}
          >
            <span className="mr-1">Next</span>
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
