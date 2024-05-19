import * as dotenv from 'dotenv';

dotenv.config({
	path: '.env',
});

export const envConfig = {
	PORT: process.env.PORT || 3000,
	ENVIRONMENT: process.env.ENVIRONMENT,
	DB_HOST: process.env.DB_HOST,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME,
	DB_PORT: process.env.DB_PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRATION: process.env.JWT_EXPIRATION,
	APPLY_ENCRYPTION: process.env.APPLY_ENCRYPTION,
	SECRET_KEY: process.env.SECRET_KEY,
	LOCALES_FOLDER: process.env.LOCALES_FOLDER,
	DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
	API_VERSION: process.env.API_VERSION,
	API_PREFIX: process.env.API_PREFIX,
	API_DOCS: process.env.API_DOCS,
	API_DOCS_PATH: process.env.API_DOCS_PATH,
	API_DOCS_JSON_PATH: process.env.API_DOCS_JSON_PATH,
};
