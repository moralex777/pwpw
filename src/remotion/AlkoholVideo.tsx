import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, staticFile } from "remotion";

const WORDS = ["ALKOHOL", "ZABIERA", "WIĘCEJ", "NIŻ", "DAJE"];

export const AlkoholVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const isMobile = height > width;

  const wordDuration = Math.floor((durationInFrames - fps * 2) / WORDS.length);
  const fadeFrames = Math.floor(fps * 0.5);
  const fontSize = Math.floor(width * 0.08);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Img
        src={staticFile(isMobile ? "images/banner-mobile.webp" : "images/banner.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />
      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
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
            [wordStart, wordStart + fadeFrames, wordEnd - fadeFrames, wordEnd],
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
                fontSize,
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
