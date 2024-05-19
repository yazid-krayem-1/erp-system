import { Router } from 'express';
import SystemStatusController from '../controllers/system-status/systemStatusController';
import { RouteDefinition } from '../types/RouteDefinition';
import { envConfig } from '../config';
import UserController from '../controllers/users/userController';

function registerControllerRoutes(routes: RouteDefinition[]): Router {
	const controllerRouter = Router();
	routes.forEach((route) => {
		switch (route.method) {
			case 'get':
				controllerRouter.get(route.path, route.handler);
				break;
			case 'post':
				controllerRouter.post(route.path, route.handler);
				break;
			case 'put':
				controllerRouter.put(route.path, route.handler);
				break;
			case 'patch':
				controllerRouter.put(route.path, route.handler);
				break;
			case 'delete':
				controllerRouter.delete(route.path, route.handler);
				break;
			default:
				throw new Error(`Unsupported HTTP method: ${route.method}`);
		}
	});
	return controllerRouter;
}

/**
 * Here, you can register routes by instantiating the controller.
 *
 */
export default function registerRoutes(): Router {
	const router = Router();

	// Define an array of controller objects
	const controllers = [new SystemStatusController(), new UserController()];

	// Dynamically register routes for each controller
	controllers.forEach((controller) => {
		// make sure each controller has basePath attribute and routes() method
		router.use(
			`/${envConfig.API_VERSION}/${controller.basePath}`,
			registerControllerRoutes(controller.routes()),
		);
	});

	return router;
}
