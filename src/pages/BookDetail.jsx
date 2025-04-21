// src/pages/BookDetail.jsx
// import { useParams } from "react-router-dom";
import StoryBook from "../components/StoryBook";

const BookDetail = () => {
  // const { id } = useParams();

  // Fetch data detail berdasarkan ID ini (bisa pakai state, axios, dll)
  // Contoh dummy:
  return (
    <div className="relative bg-[url('/img/background/Landscape.png')] w-screen h-screen">
      <div className="absolute top-10 left-10 right-10 bottom-10 z-10 flex flex-col justify-center items-center rounded-2xl bg-white/50">
        {/* <div
          className="font-cherry font-bold text-2xl text-white rounded-full bg-blue-500 
         py-3 px-10 shadow-lg"
        >
          Story Books {id}
        </div> */}
        <div className="w-full h-full bg-white rounded-2xl">
          <StoryBook />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
