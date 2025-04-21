import React from "react";
import { cn } from "../utils/className";

const cartoonColorMap = {
  pink: {
    bg: "bg-pink-500",
    border: "border-pink-700",
    text: "text-white",
    shadow: "shadow-[0_6px_0_rgb(190,24,93)]",
    hover: "hover:translate-y-1 hover:shadow-[0_4px_0_rgb(190,24,93)]",
    active: "active:translate-y-2 active:shadow-none",
    glow: "after:bg-pink-400/30",
  },
  yellow: {
    bg: "bg-yellow-400",
    border: "border-yellow-600",
    text: "text-black",
    shadow: "shadow-[0_6px_0_rgb(202,138,4)]",
    hover: "hover:translate-y-1 hover:shadow-[0_4px_0_rgb(202,138,4)]",
    active: "active:translate-y-2 active:shadow-none",
    glow: "after:bg-yellow-300/40",
  },
  blue: {
    bg: "bg-sky-400",
    border: "border-sky-700",
    text: "text-white",
    shadow: "shadow-[0_6px_0_rgb(7,89,133)]",
    hover: "hover:translate-y-1 hover:shadow-[0_4px_0_rgb(7,89,133)]",
    active: "active:translate-y-2 active:shadow-none",
    glow: "after:bg-sky-300/40",
  },
  green: {
    bg: "bg-emerald-400",
    border: "border-emerald-700",
    text: "text-white",
    shadow: "shadow-[0_6px_0_rgb(4,120,87)]",
    hover: "hover:translate-y-1 hover:shadow-[0_4px_0_rgb(4,120,87)]",
    active: "active:translate-y-2 active:shadow-none",
    glow: "after:bg-emerald-300/40",
  },
};

const TextButton = ({
  children,
  color = "pink",
  size = "md",
  className = "",
  onClick,
}) => {
  const colorStyles = cartoonColorMap[color] || cartoonColorMap.pink;

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-full border-4 font-cartoon transition-all duration-200 ease-in-out",
        "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[45%] before:rounded-t-full before:bg-gradient-to-b before:from-white/80 before:to-transparent before:opacity-80 before:pointer-events-none before:z-10",
        "after:content-[''] after:absolute after:inset-[-8px] after:rounded-full after:blur-md after:animate-pulse after:-z-10",
        sizeStyles[size],
        colorStyles.bg,
        colorStyles.border,
        colorStyles.text,
        colorStyles.shadow,
        colorStyles.hover,
        colorStyles.active,
        colorStyles.glow,
        className
      )}
    >
      {children}
    </button>
  );
};

export default TextButton;
