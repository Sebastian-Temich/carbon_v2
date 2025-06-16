import { cloneDeep } from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import { CloseModalArgs, Modal, PushModalArgs, UpdateModalArgs } from '@custom-types/modal-types';

export class ModalStore {
  constructor() {
    makeAutoObservable(this);
  }

  modals: Modal[] = [];

  push = (modal: PushModalArgs): Modal => {
    const modalId = uuidv4();
    const newModal = {
      ...modal,
      id: modalId,
      isOpen: true,
      width: modal.width || '300px',
      isLoading: modal.isLoading || false,
      agreeProps: modal.agreeProps || {},
      closeProps: modal.closeProps || {},
    };

    this.modals.push(newModal);

    return newModal;
  };

  update = ({
    id,
    isLoading,
    title,
    content,
    onAgree,
    onClose,
    agreeContent,
    closeContent,
    agreeProps,
    closeProps,
  }: UpdateModalArgs) => {
    const modalIndex = this.modals.findIndex((modal) => modal.id === id);

    if (modalIndex === -1) return;

    const clonedModal = cloneDeep(this.modals[modalIndex]);

    clonedModal.isLoading = typeof isLoading === 'boolean' ? isLoading : clonedModal.isLoading;
    clonedModal.title = typeof title === 'string' ? title : clonedModal.title;
    clonedModal.content = content ?? clonedModal.content;
    clonedModal.onAgree = typeof onAgree === 'function' ? onAgree : clonedModal.onAgree;
    clonedModal.onClose = typeof onClose === 'function' ? onClose : clonedModal.onClose;
    clonedModal.agreeContent = agreeContent ?? clonedModal.agreeContent;
    clonedModal.closeContent = closeContent ?? clonedModal.closeContent;
    clonedModal.agreeProps = agreeProps ?? clonedModal.agreeProps;
    clonedModal.closeProps = closeProps ?? clonedModal.closeProps;

    runInAction(() => {
      this.modals[modalIndex] = clonedModal;
    });
  };

  close = async ({ id, callback }: CloseModalArgs) => {
    const modalIndex = this.modals.findIndex((modal) => modal.id === id);

    if (modalIndex === -1) return;

    const clonedModal = cloneDeep(this.modals[modalIndex]);

    if (typeof callback === 'function') await callback(clonedModal);

    clonedModal.isOpen = false;

    runInAction(() => {
      this.modals[modalIndex] = clonedModal;
    });
    setTimeout(() => this.deleteModal(id), 1000);
  };

  private deleteModal = (id: string) => {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  };
}

export const modalStore = new ModalStore();
