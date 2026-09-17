"use client";

import { useEffect, useState } from "react";

type GaugeProps = {
  percent: number;
  color: string;
  className?: string;
};

const RADIUS = 80;
const ARC_LENGTH = Math.PI * RADIUS;

export default function Gauge({
  percent,
  color,
  className = "",
}: GaugeProps) {
  const safePercent = Math.max(0, Math.min(100, percent));
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    // Let the initial 0% render before animating to the actual score.
    const frame = requestAnimationFrame(() => {
      setAnimatedPercent(safePercent);
    });

    return () => cancelAnimationFrame(frame);
  }, [safePercent]);

  const dashOffset =
    ARC_LENGTH * (1 - animatedPercent / 100);

  return (
    <div
      className={`relative w-full ${className}`}
      role="img"
      aria-label={`Risk score: ${safePercent}%`}
    >
      <svg
        viewBox="0 0 200 115"
        className="block w-full"
        aria-hidden="true"
      >
        {/* Background track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Animated score arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={ARC_LENGTH}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>

      <div className="absolute inset-x-0 bottom-8 text-center">
        <span className="text-6xl font-semibold leading-none">
          {safePercent}%
        </span>
      </div>
    </div>
  );
}