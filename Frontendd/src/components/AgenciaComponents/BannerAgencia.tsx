/* eslint-disable @next/next/no-img-element */
interface BannerAgenciaProps {
  bannerImageUrl: string;
  logoImage: string;
  agencyName: string;
  info: string;
}

export default function BannerAgencia({
  bannerImageUrl,
  logoImage,
  agencyName,
  info,
}: BannerAgenciaProps) {
  return (
    <section className="relative h-72 md:h-96 w-full text-white">
      <img
        src={bannerImageUrl}
        alt={`${agencyName} banner`}
        className="object-cover w-full h-full brightness-75"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
        <img
          src={logoImage}
          alt={`${agencyName} logo`}
          className="w-28 mb-4 object-contain"
          loading="lazy"
        />
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">{agencyName}</h1>
        <p className="mt-2 max-w-3xl text-sm md:text-lg drop-shadow-md">{info}</p>
      </div>
    </section>
  );
}
