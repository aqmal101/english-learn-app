import { useNavigate } from "react-router-dom";
import TextButton from "../components/TextButton";

const MenuList = [
  { name: "Books", path: "/books", image: "/img/book.png" },
  { name: "Games", path: "/games", image: "/img/game.png" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 750);
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('/img/background/Landscape.png')] bg-cover bg-center bg-no-repeat ">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-1/2 h-fit flex justify-between items-center text-center">
          {MenuList.map((item, index) => (
            <div
              to={item.path}
              key={index}
              className="group flex flex-col items-center"
            >
              <div className="w-64 h-64 p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,165,0,1)]"
                />
                <TextButton onClick={() => handleClick(item.path)}>
                  Play
                </TextButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
