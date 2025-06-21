import type { MergeCoreCollection } from '../index.js';
import type { RDKPolicy } from './policy.js';
import type { RDKRole } from './role.js';
import type { RDKUser } from './user.js';

export type RDKAccess<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_access',
	{
		id: string; // uuid
		role: string | RDKRole<Schema>;
		user: string | RDKUser<Schema>;
		policy: string | RDKPolicy<Schema>;
		sort: number;
	}
>;
