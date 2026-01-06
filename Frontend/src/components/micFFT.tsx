import { cn } from "../utils";
import { AutoSizer } from "react-virtualized";

export default function MicFFT({
  fft,
  className,
}: {
  fft: number[];
  className?: string;
}) {
  const safeFFT = Array.isArray(fft) && fft.length > 0 ? fft : new Array(24).fill(0);

  return (
    <div className="relative size-full">
      <AutoSizer>
        {({ width, height }) => {
          const w = typeof width === "number" && width > 0 ? width : 100;
          const h = typeof height === "number" && height > 0 ? height : 32;

          return (
            <svg
              viewBox={`0 0 ${w} ${h}`}
              width={w}
              height={h}
              className={cn("absolute inset-0 size-full", className)}
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const value = Math.max(0, Math.min(1, (safeFFT[i] ?? 0) / 4));
                const barHeight = Math.max(2, h * value);
                const yPos = (h - barHeight) / 2;

                return (
                  <rect
                    key={i}
                    height={barHeight}
                    width={2}
                    x={2 + (i * (w - 4)) / 24}
                    y={yPos}
                    rx={1}
                    fill="currentColor"
                    style={{ transition: "height 0.05s ease-out" }}
                  />
                );
              })}
            </svg>
          );
        }}
      </AutoSizer>
    </div>
  );
}

