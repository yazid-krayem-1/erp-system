import i18next from 'i18next';
import { lstatSync, readdirSync } from 'fs';
import path, { join } from 'path';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

const localesFolder = path.join(__dirname, '../../locales');

const i18n = async () =>
	i18next
		.use(Backend)
		.use(middleware.LanguageDetector) // Optional, to automatically detect user's language
		.init({
			backend: {
				loadPath: `./locales/{{lng}}/{{ns}}.json`,
				addPath: `./locales/{{lng}}/{{ns}}.missing.json`,
			},
			fallbackLng: 'en', // use en if the detected language is not available
			preload: readdirSync(localesFolder).filter((file: string) => {
				const filePath = join(localesFolder, file);
				return lstatSync(filePath).isDirectory();
			}),
			saveMissing: true, // send not translated keys to endpoint
			detection: {
				order: ['header'],
				lookupHeader: 'accept-language',
			},
		});

export default i18n;
