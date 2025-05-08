import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    class: "",
    teacher: "",
    score: 0,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${baseURL}/api/v1/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = response.data.meta.data;
        setUserInfo({
          name: profileData.name || "",
          username: profileData.username || "",
          class: profileData.class || "N/A",
          teacher: "N/A",
          score: 100,
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="relative bg-[url('/img/background/Landscape.png')] bg-cover bg-center bg-no-repeat w-screen h-screen">
      <div className="absolute space-y-6 p-5 top-16 bottom-16 left-24 right-24 z-10 flex flex-col justify-center items-center rounded-2xl bg-white/50">
        <div className="font-cherry font-bold text-3xl text-white rounded-full bg-blue-500 py-3 px-10 shadow-lg">
          Profile Page
        </div>
        <div className="w-full flex flex-row h-full space-x-8">
          <div className="w-fit flex flex-col items-center justify-between bg-blue-400 rounded-3xl p-4 shadow-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center mb-2">
                <p className="text-purple-800 font-semibold text-center px-2">
                  Foto Profil/ Ava generate
                </p>
              </div>
              <div className="bg-yellow-400 w-full py-2 rounded-lg text-center">
                <p className="text-xl font-bold text-purple-800">Student</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white font-semibold mb-2">Overall Score :</p>
              <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center">
                <p className="text-5xl font-bold">{userInfo.score}</p>
              </div>
            </div>
          </div>

          <div className="w-full bg-[#5CDD60] rounded-3xl p-6 shadow-lg">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="font-semibold text-purple-800">Name :</label>
                <div className="w-full p-2 rounded-lg mt-1 bg-white">
                  {userInfo.name}
                </div>
              </div>
              <div>
                <label className="font-semibold text-purple-800">
                  Username :
                </label>
                <div className="w-full p-2 rounded-lg mt-1 bg-white">
                  {userInfo.username}
                </div>
              </div>
              <div>
                <label className="font-semibold text-purple-800">Class :</label>
                <div className="w-full p-2 rounded-lg mt-1 bg-white">
                  {userInfo.class}
                </div>
              </div>
              <div>
                <label className="font-semibold text-purple-800">
                  Teacher :
                </label>
                <div className="w-full p-2 rounded-lg mt-1 bg-white">
                  {userInfo.teacher}
                </div>
              </div>
            </div>

            <div>
              <label className="font-semibold text-purple-800">Graphic :</label>
              <div className="bg-white w-full h-48 rounded-lg mt-1 p-4 flex items-center justify-center">
                {/* Your graph or placeholder */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
