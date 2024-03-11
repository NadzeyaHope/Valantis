import { apiRequest, Product } from '@/api/index';

interface GetProductsParams {
	page: number;
	brand?: string;
	product?: string;
	price?: string;
}

const getProductIds = async (page: number): Promise<string[]> => {
	const limit = 50;
	const offset = (page - 1) * limit;

	return apiRequest({
		action: 'get_ids',
		params: { offset, limit: limit * 2 }
	});
};

const filter = async (params: Omit<GetProductsParams, 'page'>): Promise<string[]> => {
	const { product, price, brand } = params;
	const filter: Record<string, string | number> = {};

	if (product) {
		filter.product = product;
	}

	if (brand) {
		filter.brand = brand;
	}

	if (price) {
		filter.price = Number(price);
	}

	return apiRequest({
		action: 'filter',
		params: filter
	});
};

export const getProducts = async (params: GetProductsParams): Promise<Product[]> => {
	const { page, product, price, brand } = params;

	const ids = (!!product || !!price || !!brand) ? await filter(params) : await getProductIds(page);

	const products = await apiRequest({
		action: 'get_items',
		params: { ids }
	});

	return products
		.filter((p: Product, index: number) => products.findIndex((p2: Product) => p2.id === p.id) === index)
		.slice(0, 50);
};

export const getBrands = async () => {
	const brands = await apiRequest({
		action: 'get_fields',
		params: { 'field': 'brand' }
	});

	return brands.filter((item: string | null, index: number) => item !== null && brands.indexOf(item) === index);
};