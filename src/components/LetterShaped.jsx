// LetterShape.jsx
import React from "react";

export function LetterShape({ char, color = "#4F46E5", size = 64 }) {
  const gradId = `grad-${char}-${color.replace("#", "")}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define radial gradient for the shiny ball */}
      <defs>
        <radialGradient id={gradId} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={darken(color, 0.2)} stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Main circle with gradient fill */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={`url(#${gradId})`}
        stroke={darken(color, 0.3)}
        strokeWidth="2"
      />

      {/* Small highlight ellipse */}
      <ellipse cx="35" cy="35" rx="12" ry="8" fill="rgba(255,255,255,0.7)" />

      {/* Letter centered */}
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontSize="60"
        fontFamily="Fredoka, sans-serif"
        fill="#FFFFFF"
        pointerEvents="none"
      >
        {char}
      </text>
    </svg>
  );
}

// simple color darkener
function darken(hex, amount = 0.1) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) - Math.round(255 * amount);
  let g = ((num >> 8) & 0x00ff) - Math.round(255 * amount);
  let b = (num & 0x0000ff) - Math.round(255 * amount);

  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
