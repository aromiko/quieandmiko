import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockBannerRsvp = ({
  simpleBlockTitle,
  simpleBlockImage1
}: TypeComponentSimpleBlock) => {
  return (
    <section
      className="h-144 relative flex items-center justify-center overflow-hidden bg-cover bg-center lg:bg-[position:center_55%]"
      style={{
        backgroundImage: `url(${simpleBlockImage1?.basicMediaImage.url})`
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* Decorative RSVP letters in corners */}
      <span className="font-script lg:h-30 absolute left-4 top-24 z-20 w-20 text-7xl font-bold text-white/50 lg:left-10 lg:top-24 lg:w-36 lg:text-9xl">
        R
      </span>
      <span className="font-script lg:h-30 absolute right-4 top-24 z-20 w-20 text-7xl font-bold text-white/50 lg:right-10 lg:top-24 lg:w-36 lg:text-9xl">
        S
      </span>
      <span className="font-script lg:h-30 absolute bottom-4 left-4 z-20 w-20 text-7xl font-bold text-white/50 lg:bottom-8 lg:left-10 lg:w-36 lg:text-9xl">
        V
      </span>
      <span className="font-script lg:h-30 absolute bottom-4 right-4 z-20 w-20 text-7xl font-bold text-white/50 lg:bottom-8 lg:right-10 lg:w-36 lg:text-9xl">
        P
      </span>

      <h2 className="z-20 text-7xl text-white lg:text-8xl">
        {simpleBlockTitle}
      </h2>
    </section>
  );
};

export default SimpleBlockBannerRsvp;
