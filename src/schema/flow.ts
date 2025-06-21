import type { MergeCoreCollection } from '../index.js';
import type { RDKUser } from './user.js';
import type { RDKOperation } from './operation.js';

export type RDKFlow<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_flows',
	{
		id: string;
		name: string;
		icon: string | null;
		color: string | null;
		description: string | null;
		status: string;
		trigger: string | null;
		accountability: string | null;
		options: Record<string, any> | null;
		operation: RDKOperation<Schema> | string | null;
		date_created: 'datetime' | null;
		user_created: RDKUser<Schema> | string | null;
	}
>;
