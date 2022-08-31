/**
 * @jest-environment jsdom
 */

import { RDK, LocalStorage, MemoryStorage } from '../../src/base';

describe('browser sdk', function () {
	it('has storage', function () {
		const sdk = new RDK('http://example.com');
		expect(sdk.storage).toBeInstanceOf(LocalStorage);
	});

	it('has memory storage', function () {
		const sdk = new RDK('http://example.com', { storage: { mode: 'MemoryStorage' } });
		expect(sdk.storage).toBeInstanceOf(MemoryStorage);
	});
});
