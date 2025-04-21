import { Menu } from "lucide-react";
import GlowingButton from "./CandyButton";

const Settings = () => {
  return (
    <div className="relative">
      <GlowingButton color="amber" icon={<Menu className="text-white w-6 h-6" />} />
    </div>
  );
};

export default Settings;
