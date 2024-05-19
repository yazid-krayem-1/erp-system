import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { entityNames } from '../types/db_constant';

@Entity(entityNames.User)
export class User {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	created_at: Date;

	@Column()
	updated_at: Date;
}
