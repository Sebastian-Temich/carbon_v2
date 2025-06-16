import { FC } from 'react';
import { Button } from 'primereact/button';

interface LeftToolbarProps {
  onAddUser: () => void;
  newButtonLabel: string;
}

export const leftToolbar: FC<LeftToolbarProps> = ({ onAddUser, newButtonLabel }) => {
  return (
    <div className="my-2">
      <Button
        label={newButtonLabel}
        icon="pi pi-plus"
        className="p-button-success mr-2"
        onClick={() => onAddUser()}
      />
    </div>
  );
};
