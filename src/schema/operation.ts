import type { MergeCoreCollection } from '../index.js';
import type { RDKFlow } from './flow.js';
import type { RDKUser } from './user.js';

export type RDKOperation<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_operations',
	{
		id: string;
		name: string | null;
		key: string;
		type: string;
		position_x: number;
		position_y: number;
		timestamp: string;
		options: Record<string, any> | null;
		resolve: RDKOperation<Schema> | string | null;
		reject: RDKOperation<Schema> | string | null;
		flow: RDKFlow<Schema> | string;
		date_created: 'datetime' | null;
		user_created: RDKUser<Schema> | string | null;
	}
>;
