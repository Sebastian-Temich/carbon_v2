import ReactDOM from 'react-dom/client';

import App from '@app/App';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

import LanguageWrapper from './i18n/language-wrapper';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <LanguageWrapper>
    <App />
  </LanguageWrapper>,
);

serviceWorkerRegistration.register();

reportWebVitals();
