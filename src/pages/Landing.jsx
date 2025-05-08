import TextButton from "../components/TextButton";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleRouteLogin = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="h-screen max-h-screen bg-[url('/img/background/Landscape.png')] p-5 bg-cover bg-center bg-no-repeat box-border overflow-hidden">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-6 rounded-2xl p-8 w-[90%] max-w-md">
          <div className="w-[420px] h-[280px]">
            <img
              src="/img/pages/logo.png"
              alt="Logo"
              className="object-fit w-full h-full"
            />
          </div>
          <TextButton onClick={handleRouteLogin} color="pink" size="md">
            <div className="text-3xl font-bold">PLAY</div>
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
