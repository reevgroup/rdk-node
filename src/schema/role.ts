import type { MergeCoreCollection } from '../index.js';
import type { RDKUser } from './user.js';
import type { RDKAccess } from './access.js';

export type RDKRole<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_roles',
	{
		id: string;
		name: string;
		icon: string;
		description: string | null;
		parent: string | RDKRole<Schema>;
		children: string[] | RDKRole<Schema>[];
		policies: string[] | RDKAccess<Schema>[];
		users: string[] | RDKUser<Schema>[];
	}
>;
