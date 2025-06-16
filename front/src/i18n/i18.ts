import i18next from 'i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { Polish } from './locales/Polish';
import { English } from './locales/English';

// the resources is used to render trans files PL is the default
const resources = {
  pl: { translation: Polish },
  en: { translation: English },
};

// Seting the lan in to localStorege direclty with the help of LanguageDetector
const DETECTION_OPTIONS = {
  order: ['localStorage'],
  caches: ['localStorage'],
};

// Inside init it was throwing error on input labels
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

const i18n = i18next.createInstance({
  lng: 'en',
});

// here we are seeting up the default lang
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    resources,
    fallbackLng: 'pl',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
