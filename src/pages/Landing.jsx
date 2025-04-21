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
    <div className="h-screen max-h-screen bg-[url('/img/background/Landscape.png')] box-border overflow-hidden">
      <div className="w-full h-full flex justify-center items-center">
        <TextButton onClick={handleRouteLogin} color="pink" size="md">
          <div className="text-3xl font-bold">PLAY</div>
        </TextButton>
      </div>
    </div>
  );
};

export default LandingPage;
