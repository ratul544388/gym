import { getPlaiceholder } from "plaiceholder";
import Image from "next/image";
import fs from "node:fs/promises";

interface BluredImageProps {
  image: string;
  alt?: string;
  className?: string;
}

export const BluredImage = async ({
  image,
  alt,
  className,
}: BluredImageProps) => {
  const buffer = await fs.readFile(`./public${image}`);
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <div className="relative w-full max-w-[500px] aspect-[4/3]">
      <Image
        src="/images/gym_1.jpg"
        alt="product preview"
        quality={100}
        fill
        placeholder="blur"
        blurDataURL={base64}
      />
    </div>
  );
};
