import { Link } from "react-router-dom";
import Diver from "../assets/diver.png";

const MenuList = [
  { name: "Books", path: "/books" },
  { name: "Games", path: "/games" },
];

const Home = () => {
  return (
    <div className="h-screen max-h-screen bg-white box-border overflow-hidden">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-1/2 border border-gray-50 h-fit flex justify-between items-center text-center">
          {MenuList.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="group flex flex-col items-center"
            >
              <div className="w-36 h-36 p-2">
                <img
                  src={Diver}
                  alt="Diver"
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,0,255,1)]"
                />
              </div>
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
