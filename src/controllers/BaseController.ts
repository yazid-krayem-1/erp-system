import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RouteDefinition } from '../types/RouteDefinition';
import { getEncryptedText } from '../utils/index';
import { ApiResponse } from '../abstractions/ApiResponses';

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
	public send<T>(
		message: string,
		res: Response,
		statusCode: number = StatusCodes.OK,
	): void {
		try {
			const encryptedData = getEncryptedText(res.locals.data);
			const data: ApiResponse<T> = {
				message,
				success: true,
				data: encryptedData,
				error: '',
			};
			res.status(statusCode).send(data);
		} catch (error) {
			console.error('Error in BaseController.send', error);
			throw error;
		}
	}
}
