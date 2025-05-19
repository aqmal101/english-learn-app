import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoryBook from "../components/StoryBook";
import booksData from "../dummy/booksData.json";

const BookDetail = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  console.log("BookDetail", bookData);

  useEffect(() => {
    const selectedBook = booksData.data.find((book) => book.id === id);
    if (!selectedBook) return;

    import(`../dummy/${selectedBook.source}`).then((data) => {
      setBookData(data);
    });
  }, [id]);

  if (!bookData) {
    return (
      <div className="text-center mt-10 text-blue-500 font-bold text-xl">
        Loading story...
      </div>
    );
  }

  return (
    <div className="relative bg-[url('/img/background/Landscape.png')] bg-cover bg-center bg-no-repeat w-screen h-screen">
      <div className="absolute top-10 left-10 right-10 bottom-10 z-10 flex flex-col justify-center items-center rounded-2xl bg-white/50">
        <div className="w-full h-full bg-white rounded-2xl">
          <StoryBook storyBookData={bookData.pages} />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
