"use client";

import { useState, useEffect } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import DragDropComponent from "./DragDrop";

const storyBookData = [
  {
    id: "cover",
    type: "cover",
    title: "The Alphabet in the Land of Dewi Sri",
    author: "Miss Ani",
    coverImage: "../../public/img/books/book1/cover.png",
    audio: "/story-audio-intro.mp3",
  },
  {
    id: "page-1",
    pageNumber: 1,
    content:
      "Once upon a time, in a beautiful rice-growing village in Indonesia, there was a kind and gentle goddess named Dewi Sri. She was loved by everyone because she taught people how to plant rice and take care of the land. ",
    image: "",
    audio: "/story-audio-page1.mp3",
    hasActivity: true,
    dragDropWords: [
      "Dewi Sri",
      "mountain",
      "rice plant",
      "farmer",
      "hut",
      "buffalo",
    ],
    dropZones: [
      {
        id: "dewi-sri",
        label: "Dewi Sri",
        x: 50,
        y: 50,
        width: 80,
        height: 120,
      },
      {
        id: "mountain",
        label: "mountain",
        x: 200,
        y: 30,
        width: 100,
        height: 80,
      },
      {
        id: "rice-plant",
        label: "rice plant",
        x: 120,
        y: 150,
        width: 60,
        height: 70,
      },
      { id: "farmer", label: "farmer", x: 300, y: 120, width: 60, height: 90 },
      { id: "hut", label: "hut", x: 380, y: 80, width: 70, height: 70 },
      {
        id: "buffalo",
        label: "buffalo",
        x: 250,
        y: 200,
        width: 80,
        height: 60,
      },
    ],
  },
  {
    id: "page-2",
    pageNumber: 2,
    content:
      "One sunny morning, as Dewi Sri walked through the golden fields, she noticed the children were curious about how to read and write. ",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page2.mp3",
  },
  {
    id: "page-3",
    pageNumber: 3,
    content:
      "She smiled and said, “Let me teach you the magic of the alphabet, so you can write about our rice fields and tell stories of our village.”Dewi Sri waved her hand, and sparkling letters appeared in the sky. The children were amazed as each letter told its own little story about life in the village.",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page3.mp3",
  },
  {
    id: "page-4",
    pageNumber: 4,
    content:
      "A was for Andong, the cart pulled by buffalo. “Andong helps carry the rice to the market!” Dewi Sri explained.",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page4.mp3",
  },
  {
    id: "page-5",
    pageNumber: 5,
    content:
      "B was for Beras, the rice that everyone ate. “Beras gives us strength and happiness,” she said. ",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page5.mp3",
  },
  {
    id: "page-6",
    pageNumber: 6,
    content:
      "C was for Candi, the temple where people gave thanks. “It reminds us to be grateful for the blessings we have.”",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page6.mp3",
  },
  {
    id: "page-7",
    pageNumber: 7,
    content:
      "As they walked, Dewi Sri showed them more letters: D was for Dewa, the gods who protected the fields. E was for Emas, the golden rice that shone in the sunlight. F was for Fauna, the animals in the fields, like ducks and water buffalo.",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page7.mp3",
  },
  {
    id: "page-8",
    pageNumber: 8,
    content:
      "The children laughed when they saw G, which stood for Gong, the big musical instrument that echoed through the village. “We play the gong during festivals!” Dewi Sri said, clapping her hands. ",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page8.mp3",
  },
  {
    id: "page-9",
    pageNumber: 9,
    content:
      "Soon, the children began spotting letters everywhere: H was for Hujan, the rain that helped the rice grow.I was for Ikan, the fish swimming in the ponds near the fields.J was for Jagung, the corn that grew alongside the rice",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page8.mp3",
  },
  {
    id: "page-10",
    pageNumber: 10,
    content:
      "Dewi Sri encouraged the children to use their voices. “Can you say, ‘H is for Hujan, I is for Ikan, J is for Jagung’?”They shouted happily, “H is for Hujan, I is for Ikan, J is for Jagung!”",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page8.mp3",
  },
  {
    id: "page-10",
    pageNumber: 11,
    content:
      "As the sun set, Dewi Sri introduced the last letters:K for Keris, the traditional dagger.L for Lumbung, the rice barn where the harvest was stored.M for Mangga, the juicy mangoes they loved to eat.Repeat please, “K for Keris, L for Lumbung, M for Mangga!”",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page8.mp3",
  },
  {
    id: "page-10",
    pageNumber: 12,
    content:
      "The children clapped their hands and sang about the letters. “We’ve learned the alphabet with Dewi Sri, and now we can tell stories about our home!” Let’s sing this song together!",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page8.mp3",
  },
  {
    id: "page-10",
    pageNumber: 12,
    content:
      "The children clapped their hands and sang about the letters. “We’ve learned the alphabet with Dewi Sri, and now we can tell stories about our home!” Let’s sing this song together!",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page8.mp3",
  },
  {
    id: "page-10",
    pageNumber: 13,
    content:
      "Dewi Sri smiled warmly and gave them a gift—a magical book where they could write their stories and draw pictures of their favourite letters. “Remember,” she said, “the alphabet is like planting rice. Each letter is a seed that grows into beautiful words and stories.”",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page8.mp3",
  },
  {
    id: "page-10",
    pageNumber: 14,
    content:
      "From that day on, the children in the village of Dewi Sri became the best storytellers. They wrote about their fields, their animals, and their festivals, sharing their culture with the world.",
    image:
      "https://fastly.picsum.photos/id/62/2000/1333.jpg?hmac=PbFIn8k0AndjiUwpOJcfHz2h-wPCQi_vJRTJZPdr6kQ",
    audio: "/story-audio-page8.mp3",
  },
];

export default function BookStory() {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [completedActivities, setCompletedActivities] = useState({});

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

    return (
      <div className="flex flex-1 flex-col p-6 w-full h-full overflow-hidden">
        {/* Page Number Badge */}
        {page.pageNumber && (
          <div className="absolute top-6 left-6 bg-amber-500 h-7 w-7 rounded-full flex justify-center items-center font-medium text-white text-sm z-10">
            {page.pageNumber}
          </div>
        )}

        {/* Main content area - take most of the space but leave room for text */}
        <div className="relative flex-1 w-full h-4/5 overflow-hidden">
          {/* Show drag and drop activity if page has it, otherwise show image */}
          {page.hasActivity ? (
            <div className="w-full h-full bg-green-700">
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
        </div>

        {/* Text Overlay at bottom */}
        <div className="mt-4 bg-amber-500/20 p-3 rounded">
          <p className="text-sm leading-relaxed">{page.content}</p>
        </div>

        {/* Completed message if activity is completed */}
        {page.hasActivity && isActivityCompleted && (
          <div className="absolute mt-2 p-2 z-10 top-6 right-1/4 left-1/4 bg-green-100 text-green-800 rounded text-center">
            Great job! You've completed this activity!
          </div>
        )}
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
