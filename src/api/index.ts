import { Md5 } from 'ts-md5';

export type Brand = string | null;

export interface Product {
	id: string;
	price: number;
	product: string;
	brand: Brand;
}

interface ApiRequestParams {
	action: string;
	params: Record<string, string | string[] | number>;
}

const apiPassword = String(process.env.API_PASSWORD);
const apiUrl = String(process.env.API_URL);

const withLeadingZero = (n: number): string => {
	return (`0${n}`).slice(-2);
};

const createXAuth = () => {
	const now = new Date();
	return Md5.hashAsciiStr(`${apiPassword}_${now.getFullYear()}${withLeadingZero(now.getMonth() + 1)}${withLeadingZero(now.getDate())}`);
};

export const apiRequest = async (args: ApiRequestParams, attempts = 2): Promise<any> => {
	const { action, params } = args;
	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'X-Auth': createXAuth(),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ action, params }),
		cache: 'no-store'
	});

	if (!response.ok) {
		if (response.status === 500 && attempts) {
			return apiRequest(args, attempts - 1);
		}
		throw new Error(response.statusText);
	}

	const { result } = await response.json();

	return result;
};