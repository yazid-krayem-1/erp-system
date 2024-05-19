import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RouteDefinition } from '../types/RouteDefinition';
import { getEncryptedText } from '../utils/index';
import { ApiResponse } from '../abstractions/ApiResponses';

// intefaace for send input
interface SendInput<T> {
	message: string;
	res: Response;
	data: T;
	statusCode?: number;
}

/**
 * Base Controller
 */
export default abstract class BaseController {
	public abstract routes(): RouteDefinition[];

	/**
	 * Global method to send API response
	 * @param res
	 * @param statusCode
	 */
	public send<T>(request: SendInput<T>): void {
		try {
			const { message, res, data } = request;
			const statusCode = request.statusCode || StatusCodes.OK;
			const encryptedData = getEncryptedText(data);
			const result: ApiResponse<T> = {
				message,
				success: true,
				data: encryptedData,
				error: '',
			};
			res.status(statusCode).send(result);
		} catch (error) {
			console.error('Error in BaseController.send', error);
			throw error;
		}
	}
}
