import { Link, useNavigate } from "react-router-dom";
import booksData from "../dummy/booksData.json";
import { useState } from "react";
import { Lock } from "lucide-react";

console.log(booksData.data);

const BookCover = ({ image, title, isLocked, isLoading, onClick }) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center relative`}
      onClick={isLocked ? undefined : onClick}
    >
      <div
        className={`w-fit h-fit cursor pointer relative hover:shadow-2xl shadow ease-in-out${
          !isLocked ? "cursor-pointer" : "cursor-not-allowed"
        } `}
      >
        <img
          src={image}
          alt={title}
          className="w-36 h-48 object-cover relative rounded-lg shadow-lg"
        />
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/60 rounded-lg">
            {/* spinner */}
            <div className="w-12 h-12 border-6 border-t-amber-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Icon gembok jika locked */}
        {isLocked && (
          <div className="absolute top-2 right-2 bg-white/70 rounded-full p-1">
            <Lock className="w-6 h-6 text-gray-700" />
          </div>
        )}
      </div>
    </div>
  );
};

const BooksPage = () => {
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  const handleClick = (book) => {
    if (book.status === "locked") return;

    setLoadingId(book.id);

    setTimeout(() => {
      navigate(`/books/${book.id}`);
    }, 800);
  };
  return (
    <div className="relative bg-[url('/img/background/Landscape.png')] w-screen h-screen">
      {/* Overlay putih semi-transparan */}
      <div className="absolute top-20 left-20 right-20 bottom-20 z-10 flex flex-col justify-center items-center rounded-2xl bg-white/50">
        <div
          className="font-cherry font-bold text-3xl text-white rounded-full bg-blue-500 
         py-3 px-10 shadow-lg"
        >
          Story Page
        </div>
        <div className="w-full h-[80%] grid grid-cols-3 grid-rows-2 place-content-center align-cente">
          {booksData.data.map((book) => (
            <BookCover
              key={book.id}
              image={book.image}
              title={book.title}
              isLoading={loadingId === book.id}
              isLocked={book.status === "locked"}
              onClick={() => handleClick(book)}
            />
          ))}
        </div>
      </div>

      <div className="relative z-0">{/* isi lain */}</div>
    </div>
  );
};

export default BooksPage;
