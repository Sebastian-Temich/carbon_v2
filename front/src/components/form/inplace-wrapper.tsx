import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  edit: boolean;
  message: string | number | undefined;
  setEdit: (edit: boolean) => void;
}

export const InplaceWrapper: FC<Props> = ({ children, title, message, edit, setEdit }) => {
  return (
    <li className="flex align-items-center flex-wrap inplace-wrapper mr-3">
      <div className="text-500 w-6 md:w-3 md:mb-2 font-medium ml-1">{title}</div>
      <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
        <Inplace active={edit} onToggle={(e) => setEdit(e.value)} disabled={!edit}>
          <InplaceDisplay>{message}</InplaceDisplay>
          <InplaceContent>{children}</InplaceContent>
        </Inplace>
      </div>
    </li>
  );
};
