import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockBanner = ({
  simpleBlockTitle,
  simpleBlockImage1
}: TypeComponentSimpleBlock) => {
  return (
    <section
      className="h-144 relative flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${simpleBlockImage1?.basicMediaImage.url})`
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 z-10 bg-black/20" />

      <h2 className="z-20 text-7xl text-white lg:text-8xl">
        {simpleBlockTitle}
      </h2>
    </section>
  );
};

export default SimpleBlockBanner;
