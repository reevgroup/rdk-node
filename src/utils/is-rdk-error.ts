import type { RDKError } from '../types/error.js';

/**
 * A type guard to check if an error is a RDK API error
 */
export function isRDKError(error: unknown): error is RDKError {
	return (
		typeof error === 'object' &&
		error !== null &&
		'errors' in error &&
		Array.isArray(error.errors) &&
		'message' in error.errors[0] &&
		'extensions' in error.errors[0] &&
		'code' in error.errors[0].extensions
	);
}
