import { cloneElement, isValidElement, PropsWithChildren, ReactElement } from 'react';

import { observer } from 'mobx-react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Modal } from '@custom-types/modal-types';
import { modalStore } from '@store/modal-store';
import { DefaultModalContents, ModalTypes } from '@variables/modal-variables';

interface ModalProviderProps extends PropsWithChildren {}

export interface ModalContentElementProps {
  closeModal?: () => void;
}

export const ModalProvider = observer(({ children }: ModalProviderProps) => {
  const { modals } = modalStore;

  const getDialogContent = (modal: Modal) => {
    const { content } = modal;
    const isContentElement = isValidElement(content);

    const contentValue = isContentElement ? (
      cloneElement(content as ReactElement<ModalContentElementProps>, {
        closeModal: () => modalStore.close({ id: modal.id }),
      })
    ) : (
      <div>{content}</div>
    );

    const dialogContent =
      modal.type === ModalTypes.CustomContent ? (
        contentValue
      ) : (
        <div className="col-12 mb-1 ml-2">{contentValue}</div>
      );

    return dialogContent;
  };

  const getDialogActions = (modal: Modal) => {
    if (modal.type === ModalTypes.CustomContent) return null;

    return (
      <div>
        <div className="col-12 button-wrapper-inline">
          {modal.type === ModalTypes.Confirmation && (
            <div>
              <Button
                className="p-button-text mr-2 mb-2"
                onClick={() => modalStore.close({ id: modal.id, callback: modal.onAgree })}
                loading={modal.isLoading}
              >
                {modal.agreeContent ?? DefaultModalContents.Agree}
              </Button>
            </div>
          )}
          <div>
            <Button
              className="p-button-danger p-button-text mr-2 mb-2"
              onClick={() => modalStore.close({ id: modal.id, callback: modal.onClose })}
              disabled={modal.isLoading}
            >
              {modal.closeContent ?? DefaultModalContents.Close}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderedModals = modals.map((modal) => {
    const dialogContent = getDialogContent(modal);
    const dialogActions = getDialogActions(modal);

    return (
      <Dialog
        visible={modal.isOpen}
        key={modal.id}
        style={{ width: `${modal.width}` }}
        onHide={() => modalStore.close({ id: modal.id, callback: modal.onClose })}
      >
        <div className="grid formgrid">
          <div className="col-12 mb-2 ml-2">{modal.title}</div>
          {dialogContent}
          {dialogActions}
        </div>
      </Dialog>
    );
  });

  return (
    <>
      {children}
      {renderedModals}
    </>
  );
});
