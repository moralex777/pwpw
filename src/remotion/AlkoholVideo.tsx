import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, staticFile } from "remotion";

const WORDS = ["ALKOHOL", "ZABIERA", "WIĘCEJ", "NIŻ", "DAJE"];

export const AlkoholVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Each word gets ~3 seconds: 0.5s fade in, 2s hold, 0.5s fade out
  const wordDuration = Math.floor((durationInFrames - fps * 2) / WORDS.length); // reserve 2s for final fade
  const fadeFrames = Math.floor(fps * 0.5);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Img
        src={staticFile("images/banner.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 35%",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {WORDS.map((word, i) => {
          const wordStart = i * wordDuration;
          const wordEnd = wordStart + wordDuration;

          const opacity = interpolate(
            frame,
            [
              wordStart,
              wordStart + fadeFrames,
              wordEnd - fadeFrames,
              wordEnd,
            ],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={word}
              style={{
                position: "absolute",
                opacity,
                color: "white",
                fontSize: 120,
                fontWeight: 900,
                fontFamily: "'Bebas Neue', 'Arial Narrow', Impact, sans-serif",
                letterSpacing: "0.05em",
                textShadow: "0 4px 20px rgba(0,0,0,0.8)",
              }}
            >
              {word}
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
