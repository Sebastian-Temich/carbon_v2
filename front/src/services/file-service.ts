import { FileTypes } from '@variables/file-types-enum';

// This is an IMG validation
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

// Converting img for preview
export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

interface SaveFileArgs {
  content: string;
  name: string;
  type: FileTypes;
}

export const saveFile = ({ content, name, type }: SaveFileArgs) => {
  const linkElement = document.createElement('a');
  const fileBlob = new Blob([content], { type });

  linkElement.href = window.URL.createObjectURL(fileBlob);
  linkElement.download = name;
  document.body.append(linkElement);
  linkElement.click();
  linkElement.remove();

  setTimeout(() => URL.revokeObjectURL(linkElement.href), 100);
};
