import * as http from 'http';
import { AddressInfo } from 'net';
import App from './app';
import logger from './lib/logger';
import { envConfig } from './config';

const app: App = new App();
let server: http.Server;

function serverError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') {
		throw error;
	}
	// handle specific error codes here.
	throw error;
}

function serverListening(): void {
	const addressInfo: AddressInfo = <AddressInfo>server.address();
	logger.info(
		`Listening on ${addressInfo.address}:${envConfig.PORT || 8080}`,
	);
}

app.init()
	.then(() => {
		app.express.set('port', envConfig.PORT || 8080);

		server = app.httpServer;
		server.on('error', serverError);
		server.on('listening', serverListening);
		server.listen(envConfig.PORT || 8080);
	})
	.catch((err: Error) => {
		logger.info('app.init error');
		logger.error(err.name);
		logger.error(err.message);
		logger.error(err.stack);
	});

process.on('unhandledRejection', (reason: Error) => {
	logger.error('Unhandled Promise Rejection: reason:', reason.message);
	logger.error(reason.stack);
	// application specific logging, throwing an error, or other logic here
});
