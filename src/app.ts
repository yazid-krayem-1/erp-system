import cors from 'cors';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import registerRoutes from './routes/routes';
import addErrorHandler from './middleware/error-handler';
import i18n from './lib/i18next';
import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import { AppDataSouce } from './database/data-source';
import 'reflect-metadata';
import { envConfig } from './config';

export default class App {
	public express: express.Application;

	public httpServer: http.Server;

	public async init(): Promise<void> {
		const env = envConfig.ENVIRONMENT;
		this.express = express();
		this.httpServer = http.createServer(this.express);

		AppDataSouce.initialize()
			.then(() => {
				console.log('Database connected');
			})
			.catch((error) => {
				console.log('Database connection failed', error);
			});

		// add all global middleware like cors
		this.middleware();

		// // register the all routes
		this.routes();

		// add the middleware to handle error, make sure to add if after registering routes method
		this.express.use(addErrorHandler);

		// In a development/test environment, Swagger will be enabled.
		if (env && env !== 'production') {
			this.setupSwaggerDocs();
		}
	}

	/**
	 * here register your all routes
	 */
	private routes(): void {
		this.express.get('/', this.basePathRoute);
		this.express.get('/web', this.parseRequestHeader, this.basePathRoute);
		this.express.use('/', registerRoutes());
	}

	/**
	 * here you can apply your middlewares
	 */
	private middleware(): void {
		// support application/json type post data
		// support application/x-www-form-urlencoded post data
		// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
		this.express.use(helmet({ contentSecurityPolicy: false }));
		this.express.use(express.json({ limit: '100mb' }));
		this.express.use(
			express.urlencoded({ limit: '100mb', extended: true }),
		);
		// add multiple cors options as per your use
		const corsOptions = {
			origin: '*',
		};
		this.express.use(cors(corsOptions));

		// trust first proxy
		this.express.set('trust proxy', 1);

		// add il8n middleware
		i18n();

		this.express.use(middleware.handle(i18next, {}));

		this.setupSwaggerDocs();
	}

	private parseRequestHeader(
		req: express.Request,
		res: express.Response,
		next: Function,
	): void {
		// parse request header
		// console.log(req.headers.access_token);
		next();
	}

	private basePathRoute(
		request: express.Request,
		response: express.Response,
	): void {
		response.json({ message: 'base path' });
	}

	private setupSwaggerDocs(): void {
		this.express.use(
			'/docs',
			swaggerUi.serve,
			swaggerUi.setup(swaggerDocument),
		);
	}
}
