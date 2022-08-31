/**
 * @jest-environment node
 */

import { RDK, MemoryStorage } from '../../src/base';

describe('node sdk', function () {
	const sdk = new RDK('http://example.com');

	it('has storage', function () {
		expect(sdk.storage).toBeInstanceOf(MemoryStorage);
	});
});
