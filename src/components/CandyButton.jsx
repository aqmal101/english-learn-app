import React from "react";
import { cn } from "../utils/className";

const sizeMap = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
};

const colorMap = {
  pink: {
    bg: "bg-gradient-to-b from-pink-400 to-pink-600",
    border: "border-pink-700",
    shadow: "shadow-[0_8px_0_rgb(159,18,57),0_15px_20px_rgba(0,0,0,0.35)]",
    hover: "hover:shadow-[0_4px_0_rgb(159,18,57),0_8px_10px_rgba(0,0,0,0.35)]",
    active: "active:shadow-[0_0px_0_rgb(159,18,57),0_0px_0px_rgba(0,0,0,0.35)]",
    glow: "after:bg-pink-400/30",
  },
  amber: {
    bg: "bg-gradient-to-b from-amber-300 to-amber-500",
    border: "border-amber-600",
    shadow: "shadow-[0_8px_0_rgb(217,119,6),0_15px_20px_rgba(0,0,0,0.35)]",
    hover: "hover:shadow-[0_4px_0_rgb(217,119,6),0_8px_10px_rgba(0,0,0,0.35)]",
    active: "active:shadow-[0_0px_0_rgb(217,119,6),0_0px_0px_rgba(0,0,0,0.35)]",
    glow: "after:bg-amber-300/30",
  },
  blue: {
    bg: "bg-gradient-to-b from-sky-400 to-sky-600",
    border: "border-sky-700",
    shadow: "shadow-[0_8px_0_rgb(3,105,161),0_15px_20px_rgba(0,0,0,0.35)]",
    hover: "hover:shadow-[0_4px_0_rgb(3,105,161),0_8px_10px_rgba(0,0,0,0.35)]",
    active: "active:shadow-[0_0px_0_rgb(3,105,161),0_0px_0px_rgba(0,0,0,0.35)]",
    glow: "after:bg-sky-400/30",
  },
  emerald: {
    bg: "bg-gradient-to-b from-emerald-400 to-emerald-600",
    border: "border-emerald-700",
    shadow: "shadow-[0_8px_0_rgb(4,120,87),0_15px_20px_rgba(0,0,0,0.35)]",
    hover: "hover:shadow-[0_4px_0_rgb(4,120,87),0_8px_10px_rgba(0,0,0,0.35)]",
    active: "active:shadow-[0_0px_0_rgb(4,120,87),0_0px_0px_rgba(0,0,0,0.35)]",
    glow: "after:bg-emerald-400/30",
  },
  violet: {
    bg: "bg-gradient-to-b from-violet-400 to-violet-600",
    border: "border-violet-700",
    shadow: "shadow-[0_8px_0_rgb(109,40,217),0_15px_20px_rgba(0,0,0,0.35)]",
    hover: "hover:shadow-[0_4px_0_rgb(109,40,217),0_8px_10px_rgba(0,0,0,0.35)]",
    active:
      "active:shadow-[0_0px_0_rgb(109,40,217),0_0px_0px_rgba(0,0,0,0.35)]",
    glow: "after:bg-violet-400/30",
  },
  red: {
    bg: "bg-gradient-to-b from-red-400 to-red-600",
    border: "border-red-700",
    shadow: "shadow-[0_8px_0_rgb(185,28,28),0_15px_20px_rgba(0,0,0,0.35)]",
    hover: "hover:shadow-[0_4px_0_rgb(185,28,28),0_8px_10px_rgba(0,0,0,0.35)]",
    active: "active:shadow-[0_0px_0_rgb(185,28,28),0_0px_0px_rgba(0,0,0,0.35)]",
    glow: "after:bg-red-400/30",
  },
};

const GlowingButton = ({
  icon,
  color = "pink",
  size = "md",
  position = "absolute bottom-12 right-12", // default absolute
  className = "",
  onClick,
}) => {
  const colorStyles = colorMap[color] || colorMap.pink;

  return (
    <div
      onClick={onClick}
      className={cn(
        "z-50 rounded-full", // penting: relative untuk posisi absolute anak
        sizeMap[size],
        position,
        colorStyles.bg,
        colorStyles.border,
        colorStyles.shadow,
        "flex justify-center items-center cursor-pointer border-4",
        "transition-all duration-200 ease-in-out",
        colorStyles.hover,
        "hover:translate-y-2",
        "active:translate-y-4",
        colorStyles.active,
        // SHINE (natural highlight over the top edge)
        "before:content-[''] before:absolute before:top-0 before:left-0",
        "before:w-full before:h-1/2 before:rounded-t-full",
        "before:bg-gradient-to-b before:from-white/40 before:to-transparent",
        "before:opacity-80 before:pointer-events-none",
        // GLOW (blur behind)
        "after:content-[''] after:absolute after:inset-[-8px] after:rounded-full",
        colorStyles.glow,
        "after:blur-md after:animate-pulse after:-z-10",
        className
      )}
    >
      <div className="relative">
        {icon}

        {/* Optional small inner highlights for extra glossy look */}
        <div className="absolute top-[8%] left-[20%] w-[25%] h-[25%] bg-white rounded-full opacity-40 blur-[2px]" />
        <div className="absolute top-[18%] right-[20%] w-[15%] h-[15%] bg-white rounded-full opacity-20 blur-[2px]" />
      </div>
    </div>
  );
};

export default GlowingButton;
