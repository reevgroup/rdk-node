import type { MergeCoreCollection } from '../index.js';

export type RDKTranslation<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_translations',
	{
		id: string; // uuid
		language: string;
		key: string;
		value: string;
	}
>;
