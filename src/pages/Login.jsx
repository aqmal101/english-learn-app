import { Link } from "react-router-dom";
import TextButton from "../components/TextButton";

const LoginPage = () => {
  return (
    <div className="h-screen relative max-h-screen flex flex-col justify-center items-center bg-[url('/img/background/Landscape.png')] box-border overflow-hidden">
      <div className="absolute top-20 left-1/4 right-1/4 bottom-20 z-10 flex flex-col justify-center items-center rounded-2xl bg-white/90 p-10">
        <h1>Login Page</h1>
        <p>Please enter your credentials to log in.</p>

        <Link to={"/home"}>
          <TextButton color="blue" className="py-3">
            <div className="text-3xl font-bold">Login</div>
          </TextButton>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
