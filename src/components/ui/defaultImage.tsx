import type { ComponentProps } from "react";

import { ImageIcon } from "lucide-react";
import Image from "next/image";

const DefaultImage = ({
  image,
  alt,
  width,
  height,
  fill,
  ...props
}: Partial<Omit<ComponentProps<typeof Image>, "src">> & {
  image?: { url: string; alt?: string; id: string } | null;
}) => {
  if (!image) {
    return (
      <div className={props.className}>
        <ImageIcon className="size-full" />
      </div>
    );
  }

  const imageProps: ComponentProps<typeof Image> = {
    src: image.url,
    alt: alt || image.alt || "default image",
    ...props,
  };

  if (fill) {
    imageProps.fill = fill;
  } else {
    imageProps.width = width || 500;
    imageProps.height = width || 500;
  }

  return <Image {...imageProps} />;
};

export default DefaultImage;
