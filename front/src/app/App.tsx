import { FunctionComponent } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import RoutingManager from '@app/routing-manager';
import { ModalProvider } from '@components/modal-provider/modal-provider';
import { AuthContextProvider } from '@context/auth-context';
import { RefreshTokenProvider } from '@components/refresh-token-provider/refresh-token-provider';
import 'primeicons/primeicons.css';
import 'react-toastify/dist/ReactToastify.css';
import './_app.scss';
import { ToastProvider } from '@components/toast-provider/toast-provider';
import { ErrorHandlerProvider } from '@components/error-handler-provider/error-handler-provider';

const App: FunctionComponent = () => {
  return (
    <Router>
      <ToastProvider>
        <ErrorHandlerProvider>
          <AuthContextProvider>
            <RefreshTokenProvider>
              <ModalProvider>
                <RoutingManager />
              </ModalProvider>
            </RefreshTokenProvider>
          </AuthContextProvider>
        </ErrorHandlerProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
