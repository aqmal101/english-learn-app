import { useNavigate } from "react-router-dom";

const MenuList = [
  { name: "Books", path: "/books", image: "/img/book.png" },
  { name: "Games", path: "/games", image: "/img/game.png" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    // Optional: add animation or loading state here
    setTimeout(() => {
      navigate(path);
    }, 750); // 500ms delay
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('/img/background/Landscape2.png')] bg-cover bg-center bg-no-repeat ">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-1/2 h-fit flex justify-between items-center text-center">
          {MenuList.map((item, index) => (
            <button
              onClick={() => handleClick(item.path)}
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
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
