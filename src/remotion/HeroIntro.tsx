import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const GoldParticle: React.FC<{
  x: number;
  y: number;
  delay: number;
  size: number;
}> = ({ x, y, delay, size }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 20, 60, 80], [0, 0.8, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame - delay, [0, 80], [0, -30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#C5A55A",
        opacity,
        transform: `translateY(${translateY}px)`,
        filter: "blur(1px)",
      }}
    />
  );
};

const AnimatedText: React.FC<{
  text: string;
  startFrame: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  fontStyle?: string;
}> = ({ text, startFrame, fontSize, color, fontFamily, fontStyle }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - startFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame - startFrame, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize,
        color,
        fontFamily,
        fontStyle: fontStyle || "normal",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

const particles = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100,
  y: 30 + Math.random() * 50,
  delay: Math.floor(Math.random() * 60) + 30,
  size: 2 + Math.random() * 4,
  key: i,
}));

export const HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Background fade in
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Wine drip effect
  const dripHeight = interpolate(frame, [10, 50], [0, 70], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dripOpacity = interpolate(frame, [10, 20, 120, 140], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade out
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0505",
        opacity: bgOpacity * fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Wine drip from top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: 3,
          height: `${dripHeight}%`,
          background:
            "linear-gradient(180deg, #722F37 0%, rgba(114, 47, 55, 0) 100%)",
          opacity: dripOpacity,
          transform: "translateX(-50%)",
        }}
      />

      {/* Gold particles */}
      {particles.map((p) => (
        <GoldParticle key={p.key} x={p.x} y={p.y} delay={p.delay} size={p.size} />
      ))}

      {/* Main text sequence */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 10,
        }}
      >
        <Sequence from={20}>
          <AnimatedText
            text="Polewaj."
            startFrame={0}
            fontSize={72}
            color="#C5A55A"
            fontFamily="serif"
          />
        </Sequence>

        <Sequence from={45}>
          <AnimatedText
            text="Wypij."
            startFrame={0}
            fontSize={72}
            color="#C5A55A"
            fontFamily="serif"
          />
        </Sequence>

        <Sequence from={70}>
          <AnimatedText
            text="Polewaj."
            startFrame={0}
            fontSize={72}
            color="#C5A55A"
            fontFamily="serif"
          />
        </Sequence>

        <Sequence from={95}>
          <AnimatedText
            text="Wypij."
            startFrame={0}
            fontSize={72}
            color="#C5A55A"
            fontFamily="serif"
          />
        </Sequence>

        {/* Subtitle */}
        <Sequence from={130}>
          <div style={{ marginTop: 30 }}>
            <AnimatedText
              text="In Vino Veritas"
              startFrame={0}
              fontSize={28}
              color="#F5F0E8"
              fontFamily="serif"
              fontStyle="italic"
            />
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
