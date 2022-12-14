/**
 * @jest-environment node
 */

import { RDK } from '../../src';
import { test } from '../utils';

describe('fields', function () {
	test(`update one`, async (url, nock) => {
		const scope = nock()
			.patch('/fields/posts/title', { meta: { required: true } })
			.reply(200, {});

		const sdk = new RDK(url);
		await sdk.fields.updateOne('posts', 'title', {
			meta: {
				required: true,
			},
		});

		expect(scope.pendingMocks().length).toBe(0);
	});
});
