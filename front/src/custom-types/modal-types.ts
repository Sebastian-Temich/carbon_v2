import { ButtonProps } from 'primereact/button';
import { ModalTypes } from '@variables/modal-variables';

export interface Modal extends PushModalArgs {
  id: string;
  isOpen: boolean;
}
export interface PushModalArgs {
  title: string;
  type: ModalTypes;
  content: string | JSX.Element;
  isLoading?: boolean;
  width?: string | false;
  onAgree?: (modal: Modal) => Promise<unknown>;
  onClose?: (modal: Modal) => Promise<unknown>;
  agreeContent?: string;
  closeContent?: string;
  agreeProps?: ButtonProps;
  closeProps?: ButtonProps;
}
export interface CloseModalArgs {
  id: string;
  callback?: (modal: Modal) => Promise<unknown>;
}

export interface UpdateModalArgs {
  id: string;
  title?: string;
  content?: string | JSX.Element;
  isLoading?: boolean;
  onAgree?: (modal: Modal) => Promise<unknown>;
  onClose?: (modal: Modal) => Promise<unknown>;
  agreeContent?: string;
  closeContent?: string;
  agreeProps?: ButtonProps;
  closeProps?: ButtonProps;
}
