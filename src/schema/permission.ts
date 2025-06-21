import type { MergeCoreCollection } from '../index.js';
import type { RDKPolicy } from './policy.js';

export type RDKPermission<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_permissions',
	{
		id: number;
		policy: RDKPolicy<Schema> | string | null;
		collection: string; // TODO keyof complete schema
		action: string;
		permissions: Record<string, any> | null;
		validation: Record<string, any> | null;
		presets: Record<string, any> | null;
		fields: string[] | null;
	}
>;
