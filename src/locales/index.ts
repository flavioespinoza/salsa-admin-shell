import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import English translations
import enAuth from './en-US/auth.json';
import enNavigation from './en-US/navigation.json';
import enSettings from './en-US/settings.json';
import enErrors from './en-US/errors.json';
import enProfile from './en-US/profile.json';

// Import Spanish translations
import esAuth from './es-ES/auth.json';
import esNavigation from './es-ES/navigation.json';
import esSettings from './es-ES/settings.json';
import esErrors from './es-ES/errors.json';
import esProfile from './es-ES/profile.json';

// Import French translations
import frAuth from './fr-FR/auth.json';
import frNavigation from './fr-FR/navigation.json';
import frSettings from './fr-FR/settings.json';
import frErrors from './fr-FR/errors.json';
import frProfile from './fr-FR/profile.json';

// Import German translations
import deAuth from './de-DE/auth.json';
import deNavigation from './de-DE/navigation.json';
import deSettings from './de-DE/settings.json';
import deErrors from './de-DE/errors.json';
import deProfile from './de-DE/profile.json';

export const resources = {
  'en-US': {
    auth: enAuth,
    navigation: enNavigation,
    settings: enSettings,
    errors: enErrors,
    profile: enProfile,
  },
  'es-ES': {
    auth: esAuth,
    navigation: esNavigation,
    settings: esSettings,
    errors: esErrors,
    profile: esProfile,
  },
  'fr-FR': {
    auth: frAuth,
    navigation: frNavigation,
    settings: frSettings,
    errors: frErrors,
    profile: frProfile,
  },
  'de-DE': {
    auth: deAuth,
    navigation: deNavigation,
    settings: deSettings,
    errors: deErrors,
    profile: deProfile,
  },
};

export const supportedLanguages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Español' },
  { code: 'fr-FR', name: 'Français' },
  { code: 'de-DE', name: 'Deutsch' },
];

export function initI18n(): typeof i18n {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en-US',
    fallbackLng: 'en-US',
    ns: ['auth', 'navigation', 'settings', 'errors', 'profile'],
    defaultNS: 'auth',
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
}

export default i18n;
