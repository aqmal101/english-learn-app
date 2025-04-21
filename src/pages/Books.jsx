import { Link } from "react-router-dom";
import booksData from "../dummy/booksData.json";

console.log(booksData.data);

const Books = () => {
  return (
    <div className="relative bg-[url('/img/background/Landscape.png')] w-screen h-screen">
      {/* Overlay putih semi-transparan */}
      <div className="absolute top-20 left-20 right-20 bottom-20 z-10 flex flex-col justify-center items-center rounded-2xl bg-white/50">
        <div
          className="font-cherry font-bold text-3xl text-white rounded-full bg-blue-500 
         py-4 px-10 shadow-lg"
        >
          Story Books
        </div>
        <div className="w-full h-[70%] grid grid-cols-3 grid-rows-3 place-items-center bg-amber-100/90">
          {booksData.data.map((book, index) => (
            <Link key={index} to={`/books/${book.id}`}>
              <div
                key={index}
                className="w-full h-full flex border justify-center items-center"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-24 h-24 object-cover rounded-lg shadow-lg"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Konten lain di bawah overlay */}
      <div className="relative z-0">{/* isi lain */}</div>
    </div>
  );
};

export default Books;
