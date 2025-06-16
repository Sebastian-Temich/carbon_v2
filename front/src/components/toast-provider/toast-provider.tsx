import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastContainer
        className="toast-position"
        position="top-right"
        autoClose={5_000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
    </>
  );
};
