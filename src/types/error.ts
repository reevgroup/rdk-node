export interface RDKApiError {
	message: string;
	extensions: {
		code: string;
		[key: string]: any;
	};
}

export interface RDKError {
	errors: RDKApiError[];
	response: Response;
}
