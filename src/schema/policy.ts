import type { MergeCoreCollection } from '../index.js';
import type { RDKPermission } from './permission.js';
import type { RDKRole } from './role.js';
import type { RDKUser } from './user.js';

export type RDKPolicy<Schema> = MergeCoreCollection<
	Schema,
	'rdk_policies',
	{
		id: string; // uuid
		name: string;
		icon: string;
		description: string | null;
		ip_access: string | null;
		enforce_tfa: boolean;
		admin_access: boolean;
		app_access: boolean;
		permissions: number[] | RDKPermission<Schema>[];
		users: string[] | RDKUser<Schema>[];
		roles: string[] | RDKRole<Schema>[];
	}
>;
