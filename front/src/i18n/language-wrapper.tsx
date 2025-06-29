import { FC, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18';

interface LanguageWrapperProps {
  children?: ReactNode;
}

const LanguageWrapper: FC<LanguageWrapperProps> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default LanguageWrapper;
