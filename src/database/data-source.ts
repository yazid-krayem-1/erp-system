import { DataSource } from 'typeorm';
import { envConfig } from '../config/environment';
import { User } from '../models/User';

export const AppDataSouce = new DataSource({
	type: 'postgres',
	host: envConfig.DB_HOST,
	port: parseInt(envConfig.DB_PORT),
	username: envConfig.DB_USER,
	password: envConfig.DB_PASSWORD,
	database: envConfig.DB_NAME,
	synchronize: false,
	logging: false,
	entities: [User],
	migrations: ['dist/src/database/migrations/*.js'],
	subscribers: [
		// Add your subscribers here
	],
});
