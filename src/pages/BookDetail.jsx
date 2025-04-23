import StoryBook from "../components/StoryBook";

const BookDetail = () => {
  return (
    <div className="relative bg-[url('/img/background/Landscape.png')] w-screen h-screen">
      <div className="absolute top-10 left-10 right-10 bottom-10 z-10 flex flex-col justify-center items-center rounded-2xl bg-white/50">
        <div className="w-full h-full bg-white rounded-2xl">
          <StoryBook />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
