import { Composition } from "remotion";
import { AlkoholVideo } from "./AlkoholVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AlkoholVideo"
        component={AlkoholVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AlkoholVideoMobile"
        component={AlkoholVideo}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
