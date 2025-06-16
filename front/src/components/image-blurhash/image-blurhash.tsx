import { useState } from 'react';
import { Blurhash } from 'react-blurhash';

interface ImageBlurhashProps {
  imageBlurhash: string;
  imageUri: string;
  imageAspectRatio: number;
  className: string;
  blurhashHeight: number;
}
export const ImageBlurhash = (props: ImageBlurhashProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { imageBlurhash, imageUri, imageAspectRatio, className, blurhashHeight } = props;
  return (
    <>
      <div
        className={`content ${className}`}
        style={{
          height: blurhashHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isVisible ? 0 : 100,
        }}
      >
        <Blurhash
          hash={imageBlurhash}
          width="100%"
          height="unset"
          style={{ aspectRatio: imageAspectRatio }}
        />
      </div>
      <img
        src={imageUri}
        alt="offset"
        style={{
          opacity: isVisible ? 100 : 0,
        }}
        className={className}
        onLoad={() => setIsVisible(true)}
      />
    </>
  );
};
