import { RouteDefinition } from '../../types/RouteDefinition';
import BaseController from '../BaseController';

export default class UserController extends BaseController {
	public basePath: string = 'users';

	public routes(): RouteDefinition[] {
		return [
			{
				path: '/',
				method: 'get',
				handler: this.getUsers.bind(this),
			},
			{
				path: '/:id',
				method: 'get',
				handler: this.getUserById.bind(this),
			},
			{
				path: '/',
				method: 'post',
				handler: this.createUser.bind(this),
			},
			{
				path: '/:id',
				method: 'put',
				handler: this.updateUser.bind(this),
			},
			{
				path: '/:id',
				method: 'delete',
				handler: this.deleteUser.bind(this),
			},
		];
	}

	public async getUsers(req: any, res: any): Promise<void> {
		res.json({ message: 'getUsers' });
	}

	public async getUserById(req: any, res: any): Promise<void> {
		res.json({ message: 'getUserById' });
	}

	public async createUser(req: any, res: any): Promise<void> {
		res.json({ message: 'createUser' });
	}

	public async updateUser(req: any, res: any): Promise<void> {
		res.json({ message: 'updateUser' });
	}

	public async deleteUser(req: any, res: any): Promise<void> {
		res.json({ message: 'deleteUser' });
	}
}
