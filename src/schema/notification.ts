import type { MergeCoreCollection } from '../index.js';
import type { RDKUser } from './user.js';

export type RDKNotification<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_notifications',
	{
		id: string;
		timestamp: 'datetime' | null;
		status: string | null;
		recipient: RDKUser<Schema> | string;
		sender: RDKUser<Schema> | string | null;
		subject: string;
		message: string | null;
		collection: string | null; // TODO keyof complete schema
		item: string | null;
	}
>;
