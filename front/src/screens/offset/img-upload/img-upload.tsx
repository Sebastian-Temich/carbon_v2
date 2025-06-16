import { FC, useRef, useState } from 'react';
import { fileToBase64, MAX_IMAGE_SIZE } from '@services/file-service';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';

import { ProgressSpinner } from 'primereact/progressspinner';
import { ImgFileTypes } from '@custom-types/img-types';
import uploadLogo from '@assets/img/img-upload.png?as=webp';

const ImgUpload: FC<{
  setImageFile: (imageFile: ImgFileTypes | null) => void;
}> = ({ setImageFile }) => {
  // This is for preview the img so we must have to have it
  const [imgSrc, setImgSrc] = useState<string | null>();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This is to clear an input value
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: any) => {
    const target = e.target as HTMLInputElement;

    const fileArray = target.files;
    if (fileArray) {
      if (fileArray[0].size > MAX_IMAGE_SIZE) {
        setError(t('yup.error.imageSize'));
        return;
      }
      setLoading(true);
      setError(null);
      const base64 = (await fileToBase64(fileArray[0])) as string;
      const imageFiles: ImgFileTypes = {
        contentAsBase64: base64.split('base64,')[1],
        fileNameWithExtension: fileArray[0].name,
        contentType: fileArray[0].type,
      };
      setImageFile(imageFiles);
      setImgSrc(base64);
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setImgSrc(null);
    setImageFile(null);
    fileInputRef.current?.value && (fileInputRef.current.value = '');
  };

  return (
    <>
      {imgSrc ? (
        <div className="text-center">
          <Button
            label={t('button.remove')}
            style={{ width: '120px', float: 'right' }}
            type="button"
            className="p-button-danger"
            onClick={handleRemove}
          />
          <img className="preview-img" src={imgSrc} alt="Preview" />
        </div>
      ) : (
        <div className="select-img">
          <span
            className="select-img-pointer"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="p-inputtext p-component"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleImageChange}
              hidden
            />
            <img className="w-full xl:w-6" src={uploadLogo} alt="Preview" />
          </span>
        </div>
      )}

      {loading && (
        <div className="text-center">
          <ProgressSpinner className="progress-spinner" />
        </div>
      )}

      {error && (
        <p className="text-center" style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </>
  );
};

export default ImgUpload;
